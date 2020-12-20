//libs
import React from 'react';


const RenderView = ({ renderIfTrue, renderIfFalse, children }) => {
    if (renderIfTrue !== null) {
        return renderIfTrue ? <React.Fragment>{children}</React.Fragment> : null;
    }
    if (renderIfFalse !== null) {
        return renderIfFalse ? null : <React.Fragment>{children}</React.Fragment>;
    }
    return null;
};

RenderView.defaultProps = {
    renderIfTrue: null,
    renderIfFalse: null
}

export default RenderView;