class EditIconHelpers {
    constructor() {
        this.FILL_ATTRIBUTE_NAME = 'fill';
        this.STROKE_ATTRIBUTE_NAME = 'stroke';
        this.COLOR_ATTRIBUTE_EXCLUDE_VALUE_LIST = ['none', 'transparent'];
        this.SVG_NODE_NAME = 'svg';
        this.SVG_CHILDREN_TO_EXCLUDE_LIST = ['defs', 'title', 'style'];
        this.svgColorNodeList = [];
    }

    /*  General guidelines for editing svg color
        0) Few nodes like title,defs add no meaning so we can exclude that
        1) Might be possible that the node may be group and can have stroke and fill
        2) Possiblity of stroke and fill attribute may be there but its value can be none or it can contain gradient url 
        3) Future : Defs and class name to assign styles we cant do anything here (fallback all Nodes except g take and return to user)
        4) Future:Style attribute can also be there instead of fill and stroke 
    */
    getSvgNodeFromHtmlNodeList(htmlCollection) {
        if (!htmlCollection.length) return null;
        for (let i = 0; i < htmlCollection.length; i++) {
            const nodeName = htmlCollection[i].nodeName;
            if (nodeName === this.SVG_NODE_NAME) {
                return htmlCollection[i];
            }
        }
    }

    insertIntoSvgColorNodeList(type, node) {
        this.svgColorNodeList.push({ type, node });
    }

    getChildNodesWithColorAttributes(child) {
        if (child.hasAttribute(this.FILL_ATTRIBUTE_NAME) && (child.hasAttribute(this.STROKE_ATTRIBUTE_NAME))) {
            const fillValue = child.getAttribute(this.FILL_ATTRIBUTE_NAME);
            const strokeValue = child.getAttribute(this.FILL_ATTRIBUTE_NAME);
            if (!this.COLOR_ATTRIBUTE_EXCLUDE_VALUE_LIST.includes(fillValue) && !this.COLOR_ATTRIBUTE_EXCLUDE_VALUE_LIST.includes(strokeValue)) {
                this.insertIntoSvgColorNodeList([this.FILL_ATTRIBUTE_NAME, this.STROKE_ATTRIBUTE_NAME], child);
            }
        }
        else if (child.hasAttribute(this.FILL_ATTRIBUTE_NAME)) {
            const value = child.getAttribute(this.FILL_ATTRIBUTE_NAME);
            if (!this.COLOR_ATTRIBUTE_EXCLUDE_VALUE_LIST.includes(value)) {
                this.insertIntoSvgColorNodeList([this.FILL_ATTRIBUTE_NAME], child);
            }
        }
        else if (child.hasAttribute(this.STROKE_ATTRIBUTE_NAME)) {
            const value = child.getAttribute(this.STROKE_ATTRIBUTE_NAME);
            if (!this.COLOR_ATTRIBUTE_EXCLUDE_VALUE_LIST.includes(value)) {
                this.insertIntoSvgColorNodeList([this.STROKE_ATTRIBUTE_NAME], child);
            }
        }
    }

    traverseAllChildrenAndGetValidColorNode(node, fallBackMode = false) {
        //    console.log(" I am a top code node", node);
        const children = node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (!this.SVG_CHILDREN_TO_EXCLUDE_LIST.includes(child.nodeName)) {
                if (child.children.length) {
                    this.traverseAllChildrenAndGetValidColorNode(child);
                }
                if (fallBackMode) {

                }
                else {
                    this.getChildNodesWithColorAttributes(child);
                }
            }
        }
    }

    getSvgNodeAndReturnColorNodeList(svgNode) {
        this.traverseAllChildrenAndGetValidColorNode(svgNode);
        return this.svgColorNodeList;
    }



    applyNewColortoSvg(htmlCollection, colorConfig) {
        try {
            const svgNode = this.getSvgNodeFromHtmlNodeList(htmlCollection);
            this.svgColorNodeList = [];
            if (svgNode) {
                const colorNodeList = this.getSvgNodeAndReturnColorNodeList(svgNode);
                console.log("The applyNewColortoSvg testing is ", colorNodeList);
                return;
            }
            throw new Error("Not a valid svg Node found");
        }
        catch (e) {
            console.log(e);
        }
    }

};

export const editIconHelpers = new EditIconHelpers();