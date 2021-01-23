//libs
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import getSVGColors from 'get-svg-colors-browser';
//css
import styles from './edit-icon-color-selector.module.css';
//compoents
import { SketchPicker } from 'react-color';
import ColorSwatch from '../../reusables/color-swatch/color-swatch.component';
//actions
import { changeUserSelectedColor } from '../../../redux/edit-icon/edit-icon.actions';
//selectors
import { selectIconToEdit, selectIsEditIconModalOpen } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { EDIT_ICON_APPLY_COLOR_DEBOUNCE_TIME, DEFAULT_BLACK_COLOR } from '../../../utilities/app.constants';

const pickerStyles = {
    picker: {
        boxShadow: 'none',
        width: '235px'
    }
};

const EditIconColorSelector = ({ iconToEdit, isEditIconModalOpen, changeUserSelectedColor }) => {

    const [color, setColor] = useState(null);
    const debounceRef = useRef({ timerId: null });

    const swatches = ["#361faa", "#a02acb", "#d9d2f1", "#9997ba", "#ad5700", "#de0843"];

    const { iconData } = iconToEdit;

    useEffect(() => {
        if (isEditIconModalOpen && iconData) {
            getSVGColors(iconData).then((svgColors) => {
                setColor(svgColors.fills[0] ?? DEFAULT_BLACK_COLOR);
            });
        }
    }, [isEditIconModalOpen, iconData]);

    const handleColorChangeChange = ({ hex: hexColor }) => {
        setColor(hexColor);
        if (debounceRef.current.timerId) {
            clearTimeout(debounceRef.current.timerId);
        }
        debounceRef.current.timerId = setTimeout(() => {
            changeUserSelectedColor(hexColor);
        }, EDIT_ICON_APPLY_COLOR_DEBOUNCE_TIME);
    };

    const handleSwatchClick = (hexColor) => {
        setColor(hexColor);
        changeUserSelectedColor(hexColor);
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
                    <div className={styles.swatchContainer}>
                        {
                            swatches.map((color) => (
                                <ColorSwatch
                                    key={color}
                                    color={color}
                                    handleSwatchClick={() => handleSwatchClick(color)} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    iconToEdit: selectIconToEdit,
    isEditIconModalOpen: selectIsEditIconModalOpen,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserSelectedColor: (colorConfig) => dispatch(changeUserSelectedColor(colorConfig))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconColorSelector);