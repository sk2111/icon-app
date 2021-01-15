//libs
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import getSVGColors from 'get-svg-colors-browser';
//css
import styles from './edit-icon-color-selector.module.css';
//compoents
import { SketchPicker } from 'react-color';
//actions
import { changeUserSelectedColor } from '../../../redux/edit-icon/edit-icon.actions';
//selectors
import { selectIconToEdit } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { EDIT_ICON_INPUT_DEBOUNCE_TIME } from '../../../utilities/app.constants';


const EditIconColorSelector = ({ iconToEdit, changeUserSelectedColor }) => {

    const [color, setColor] = useState({ a: 1, b: 0, g: 0, r: 0 });
    const debounceRef = useRef({ timerId: null });


    const { iconData } = iconToEdit;

    useEffect(() => {
        // getSVGColors(iconData).then((colors) => {
        //     console.log("testing colors", colors);
        // });
    }, []);


    const handleColorChangeChange = (color) => {
        setColor(color.rgb);
        if (debounceRef.current.timerId) {
            clearTimeout(debounceRef.current.timerId);
        }
        debounceRef.current.timerId = setTimeout(() => {
            changeUserSelectedColor(color);
        }, EDIT_ICON_INPUT_DEBOUNCE_TIME);
    };

    return (
        <div>
            <SketchPicker color={color} presetColors={[]} disableAlpha onChange={handleColorChangeChange} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    iconToEdit: selectIconToEdit
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserSelectedColor: (colorConfig) => dispatch(changeUserSelectedColor(colorConfig))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconColorSelector);