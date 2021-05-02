//libs
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import getSVGColors from 'get-svg-colors-browser';
//css
import styles from './edit-icon-color-selector.module.css';
//components
import { SketchPicker } from 'react-color';
import ColorSwatch from '../../reusables/color-swatch/color-swatch.component';
import DeleteSwatch from '../delete-swatch/delete-swatch.component';
import Tooltip from '../../reusables/Tooltip/Tooltip.component';
//actions
import { changeUserSelectedColor } from '../../../redux/edit-icon/edit-icon.actions';
//selectors
import { selectIconToEdit, selectIsEditIconModalOpen } from '../../../redux/edit-icon/edit-icon.selectors';
//helpers
import { getStoredSwatches, setStoredSwatches } from './local-storage';
//constants
import { EDIT_ICON_APPLY_COLOR_DEBOUNCE_TIME, DEFAULT_BLACK_COLOR, PICKER_STYLE } from '../../../utilities/app.constants';
// user local storage access
import { SWATCH_SIZE } from './local-storage';

const storedSwatches = JSON.parse(getStoredSwatches());


const EditIconColorSelector = ({ iconToEdit: { iconData }, isEditIconModalOpen, changeUserSelectedColor }) => {

    const [color, setColor] = useState(null);
    const [showDeleteSwatchZone, setShowDeleteSwatchZone] = useState(false);
    const [swatches, setSwatches] = useState(storedSwatches);
    const debounceRef = useRef({ timerId: null });

    useEffect(() => {
        if (isEditIconModalOpen && iconData) {
            getSVGColors(iconData).then((svgColors) => {
                setColor(svgColors.fills[0] ?? DEFAULT_BLACK_COLOR);
            });
        }
    }, [isEditIconModalOpen, iconData]);

    const updateSwatchList = (hexColor, toDelete = false) => {
        const swatchList = toDelete ? swatches.filter(color => color !== hexColor) : [hexColor, ...swatches];
        const updatedSwatchList = Array.from(new Set(swatchList)).slice(0, SWATCH_SIZE);
        setStoredSwatches(updatedSwatchList);
        setSwatches(updatedSwatchList);
    };

    const handleColorChange = ({ hex: hexColor }) => {
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
                        styles={PICKER_STYLE}
                        color={color ?? DEFAULT_BLACK_COLOR}
                        presetColors={[]}
                        disableAlpha
                        onChange={handleColorChange} />
                    <div className={styles.swatchContainer}>
                        <div className={styles.addSwatchesContainer}>
                            <Tooltip title={'Click + to add selected color to swatches'}>
                                <h6 className={styles.addSwatchLabel}>
                                    Swatches
                                </h6>
                            </Tooltip>
                            <button
                                className={styles.favButton}
                                onClick={() => updateSwatchList(color, false)}>
                                +
                            </button>
                        </div>
                        <div className={styles.swatchColorContainer}>
                            {
                                swatches.map((color) => (
                                    <ColorSwatch
                                        key={color}
                                        color={color}
                                        handleDragStart={() => setShowDeleteSwatchZone(true)}
                                        handleDragEnd={() => setShowDeleteSwatchZone(false)}
                                        handleSwatchClick={() => handleSwatchClick(color)} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <DeleteSwatch
                    showDeleteZone={showDeleteSwatchZone}
                    setShowDeleteZone={setShowDeleteSwatchZone}
                    updateSwatchList={updateSwatchList} />
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