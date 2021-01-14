//libs
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import getSVGColors from 'get-svg-colors-browser';
//css
import styles from './edit-icon-color-selector.module.css';
//compoents
import { SketchPicker } from 'react-color';
//selectors
import { selectIconToEdit } from '../../../redux/edit-icon/edit-icon.selectors';

const EditIconColorSelector = ({ iconToEdit }) => {

    const [color, setColor] = useState({ a: 1, b: 0, g: 0, r: 0 });


    const { iconData } = iconToEdit;

    useEffect(() => {
        // getSVGColors(iconData).then((colors) => {
        //     console.log("testing colors", colors);
        // });
    }, []);

    return (
        <div>
            <SketchPicker color={color} presetColors={[]} onChange={(color) => {
                console.log("color change", color);
                setColor(color.rgb);
            }} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    iconToEdit: selectIconToEdit
});

const mapDispatchToProps = () => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconColorSelector);