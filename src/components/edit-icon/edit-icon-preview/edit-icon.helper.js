class EditIconHelpers {
    constructor() {
        this.FILL_ATTRIBUTE_NAME = 'fill';
        this.STROKE_ATTRIBUTE_NAME = 'stroke';
        this.COLOR_ATTRIBUTE_NODE_EXCLUDE_VALUE_LIST = ['none', 'transparent'];
        this.COLOR_VALUES_EXCLUDE_LIST = ['none', 'transparent', '#url', 'url', "#"];
        this.SVG_NODE_NAME = 'svg';
        this.FALLBACK_COLOR = '#000000';
        this.SVG_CHILDREN_TO_EXCLUDE_LIST = ['defs', 'title', 'style'];
        this.svgColorNodeList = [];
    }

    /*  General guidelines for editing svg color
        0) Few nodes like title,defs add no meaning so we can exclude that
        1) Might be possible that the node may be group and can have stroke and fill
        2) Possiblity of stroke and fill attribute may be there but its value can be none or it can contain gradient url 
        3) Future : Defs and class name to assign styles we cant do anything here (fallback all Nodes except g take and return to user)
        4) Future:Style attribute can also be there instead of fill and stroke 
        5) Svg optimizer - takes care of 3 and 4 points since it remove defs and move as inline attribtes
    */
    getSvgNodeFromHtmlNodeList(htmlCollection) {
        if (!htmlCollection.length) return null;
        for (let i = 0; i < htmlCollection.length; i++) {
            const nodeName = htmlCollection[i].nodeName;
            if (nodeName === this.SVG_NODE_NAME) {
                return htmlCollection[i];
            }
        }
        return null;
    }

    insertIntoSvgColorNodeList(type, node, value) {
        this.svgColorNodeList.push({ attributeTypes: type, node, nodeValues: value });
    }

    getChildNodesWithColorAttributes(child) {
        if (child.hasAttribute(this.FILL_ATTRIBUTE_NAME) && (child.hasAttribute(this.STROKE_ATTRIBUTE_NAME))) {
            const fillValue = child.getAttribute(this.FILL_ATTRIBUTE_NAME);
            const strokeValue = child.getAttribute(this.FILL_ATTRIBUTE_NAME);
            if (!this.COLOR_ATTRIBUTE_NODE_EXCLUDE_VALUE_LIST.includes(fillValue) && !this.COLOR_ATTRIBUTE_NODE_EXCLUDE_VALUE_LIST.includes(strokeValue)) {
                this.insertIntoSvgColorNodeList([this.FILL_ATTRIBUTE_NAME, this.STROKE_ATTRIBUTE_NAME], child, [fillValue, strokeValue]);
            }
        }
        else if (child.hasAttribute(this.FILL_ATTRIBUTE_NAME)) {
            const fillValue = child.getAttribute(this.FILL_ATTRIBUTE_NAME);
            if (!this.COLOR_ATTRIBUTE_NODE_EXCLUDE_VALUE_LIST.includes(fillValue)) {
                this.insertIntoSvgColorNodeList([this.FILL_ATTRIBUTE_NAME], child, [fillValue]);
            }
        }
        else if (child.hasAttribute(this.STROKE_ATTRIBUTE_NAME)) {
            const strokeValue = child.getAttribute(this.STROKE_ATTRIBUTE_NAME);
            if (!this.COLOR_ATTRIBUTE_NODE_EXCLUDE_VALUE_LIST.includes(strokeValue)) {
                this.insertIntoSvgColorNodeList([this.STROKE_ATTRIBUTE_NAME], child, [strokeValue]);
            }
        }
    }

    getAllSvgNodes(child) {
        const fillValue = child.getAttribute(this.FILL_ATTRIBUTE_NAME);
        if (!this.COLOR_ATTRIBUTE_NODE_EXCLUDE_VALUE_LIST.includes(fillValue)) {
            this.insertIntoSvgColorNodeList([this.FILL_ATTRIBUTE_NAME], child, [this.FALLBACK_COLOR]);
        }
    }

    traverseAllChildrenAndGetValidColorNode(node, fallback) {
        const children = node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (!this.SVG_CHILDREN_TO_EXCLUDE_LIST.includes(child.nodeName)) {
                if (child.children.length) {
                    this.traverseAllChildrenAndGetValidColorNode(child);
                }
                if (fallback) {
                    this.getAllSvgNodes(child);
                }
                else {
                    this.getChildNodesWithColorAttributes(child);
                }
            }
        }
    }

    getSvgNodeAndReturnColorNodeList(svgNode, fallback) {
        this.traverseAllChildrenAndGetValidColorNode(svgNode, fallback);
        return this.svgColorNodeList;
    }

    getSvgColorNodeList(htmlCollection) {
        try {
            const svgNode = this.getSvgNodeFromHtmlNodeList(htmlCollection);
            this.svgColorNodeList = [];
            if (svgNode) {
                let colorNodeList = this.getSvgNodeAndReturnColorNodeList(svgNode);
                if (colorNodeList.length) {
                    return [...colorNodeList];
                }
                else {
                    //fallback logic to fetch all the svg paths 
                    colorNodeList = this.getSvgNodeAndReturnColorNodeList(svgNode, true);
                    return [...colorNodeList];
                }

            }
            throw new Error("Not a valid svg Node found");
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }


    // changing colors
    changeColorForNodeList(nodeList, hexColor) {
        try {
            const nodeAttributeValuesToIgnore = this.COLOR_VALUES_EXCLUDE_LIST.join(' ');
            nodeList.forEach(({ attributeTypes, node, nodeValues }) => {
                attributeTypes.forEach((attribute, index) => {
                    const attributeValue = nodeValues[index].split('(')[0]; // split by brackets
                    if (!nodeAttributeValuesToIgnore.includes(attributeValue)) {
                        //when attribute value is not included in ignore constant list
                        node.setAttribute(attribute, hexColor);
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }
};

export const editIconHelpers = new EditIconHelpers();