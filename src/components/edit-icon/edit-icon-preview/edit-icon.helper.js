class EditIconHelpers {
    constructor() {
        this.SVG_NODE_NAME = 'svg';
        this.SVG_CHILDREN_TO_EXCLUDE_LIST = ['defs', 'title'];
    }

    getSvgNodeFromHtmlNodeList(htmlCollection) {
        if (!htmlCollection.length) return null;
        for (let i = 0; i < htmlCollection.length; i++) {
            const nodeName = htmlCollection[i].nodeName;
            if (nodeName === this.SVG_NODE_NAME) {
                return htmlCollection[i];
            }
        }
    }

    getSvgNodeAndReturnColorNodeList(svgNode) {
        console.log(" the getSvgNodeAndReturnColorNodeList is ", svgNode);
        const childrens = svgNode.children;
        console.log("Children", childrens);
    }



    applyNewColortoSvg(htmlCollection, colorConfig) {
        try {
            const svgNode = this.getSvgNodeFromHtmlNodeList(htmlCollection);
            if (svgNode) {
                this.getSvgNodeAndReturnColorNodeList(svgNode);
                console.log("The applyNewColortoSvg testing is ", svgNode);
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