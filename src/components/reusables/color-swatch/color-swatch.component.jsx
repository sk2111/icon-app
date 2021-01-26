//libs
import React from 'react';
//css
import styles from './color-swatch.module.css';




const ColorSwatch = ({ color, handleSwatchClick, handleDragStart, handleDragEnd }) => {

    const colorSwatchStyle = { 'backgroundColor': color };

    const onDragStart = (event) => {
        event.dataTransfer.setData("color", color);
        event.dataTransfer.effectAllowed = "copy";
        handleDragStart();
    };

    return (
        <div style={colorSwatchStyle}
            className={styles.swatchBox}
            title={String(color).toUpperCase()}
            data-color={color}
            draggable="true"
            onDragStart={onDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleSwatchClick}></div>
    );

};


ColorSwatch.defaultProps = {
    color: '',
    handleSwatchClick: () => { },
    handleDragStart: () => { },
    handleDragEnd: () => { }
};

export default ColorSwatch;