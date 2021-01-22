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
import { EDIT_ICON_APPLY_COLOR_DEBOUNCE_TIME, DEFAULT_BLACK_COLOR } from '../../../utilities/app.constants';

const pickerStyles = {
    picker: {
        boxShadow: 'none',
        width: '235px'
    }
};

const EditIconColorSelector = ({ iconToEdit, changeUserSelectedColor }) => {

    const [color, setColor] = useState(null);
    const debounceRef = useRef({ timerId: null });

    const { iconData } = iconToEdit;

    useEffect(() => {
        if (color === null && iconData) {
            getSVGColors(iconData).then((svgColors) => {
                setColor(svgColors.fills[0] ?? DEFAULT_BLACK_COLOR);
            });
        }
    }, [color, iconData]);

    const handleColorChangeChange = (color) => {
        setColor(color.hex);
        if (debounceRef.current.timerId) {
            clearTimeout(debounceRef.current.timerId);
        }
        debounceRef.current.timerId = setTimeout(() => {
            changeUserSelectedColor(color);
        }, EDIT_ICON_APPLY_COLOR_DEBOUNCE_TIME);
    };

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.colorPickerContainer}>
                    <SketchPicker
                        styles={pickerStyles}
                        color={color ?? DEFAULT_BLACK_COLOR}
                        presetColors={[]}
                        disableAlpha
                        onChange={handleColorChangeChange} />
                    <div>Test check</div>
                </div>
            </div>
        </React.Fragment>
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