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
//helpers
import { getStoredSwatches, setStoredSwatches } from './local-storage';
//constants
import { EDIT_ICON_APPLY_COLOR_DEBOUNCE_TIME, DEFAULT_BLACK_COLOR, PICKER_STYLE } from '../../../utilities/app.constants';
import { SWATCH_SIZE } from './local-storage';

const storedSwatches = JSON.parse(getStoredSwatches());

const EditIconColorSelector = ({ iconToEdit: { iconData }, isEditIconModalOpen, changeUserSelectedColor }) => {

    const [color, setColor] = useState(null);
    const [showDeleteSwatch, setShowDeleteSwatch] = useState(false);
    const [swatches, setSwatches] = useState(storedSwatches);
    const debounceRef = useRef({ timerId: null });
    const deleteZoneRef = useRef(null);


    const deleteZone = `${styles.deleteSwatchZone} ${showDeleteSwatch ? styles.visible : styles.hidden}`;


    useEffect(() => {
        if (isEditIconModalOpen && iconData) {
            getSVGColors(iconData).then((svgColors) => {
                setColor(svgColors.fills[0] ?? DEFAULT_BLACK_COLOR);
            });
        }
    }, [isEditIconModalOpen, iconData]);

    const updateSwatchList = (hexColor) => {
        const updatedSwatchList = Array.from(new Set([hexColor, ...swatches])).slice(0, SWATCH_SIZE);
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

    const handleSwatchDragStart = () => {
        setShowDeleteSwatch(true);
    };
    const handleSwatchDragEnd = () => {
        setShowDeleteSwatch(false);
    };

    const handleDeleteZoneEnter = (event) => {
        event.dataTransfer.dropEffect = "copy";
        if (!deleteZoneRef.current) return;
        deleteZoneRef.current.style.boxShadow = "0px 0px 1px 5px #f34469";
    };

    const handleDeleteZoneDragOver = (event) => {
        event.dataTransfer.dropEffect = "copy";
        event.preventDefault();
    };

    const handleDeleteZoneLeave = () => {
        if (!deleteZoneRef.current) return;
        deleteZoneRef.current.style.boxShadow = "";
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
                            <h6 className={styles.addSwatchLabel}>Swatches </h6>
                            <button title="Add color to swatches" className={styles.favButton} onClick={() => updateSwatchList(color)}>+</button>
                        </div>
                        <div className={styles.swatchColorContainer}>
                            {
                                swatches.map((color) => (
                                    <ColorSwatch
                                        key={color}
                                        color={color}
                                        handleDragStart={handleSwatchDragStart}
                                        handleDragEnd={handleSwatchDragEnd}
                                        handleSwatchClick={() => handleSwatchClick(color)} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div ref={deleteZoneRef}
                    className={deleteZone}
                    onDragEnter={handleDeleteZoneEnter}
                    onDragOver={handleDeleteZoneDragOver}
                    onDragLeave={handleDeleteZoneLeave}>
                    Delete Swatch
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