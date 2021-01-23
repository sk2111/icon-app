//libs
import React from 'react';
//css
import styles from './color-swatch.module.css';


const ColorSwatch = ({ color, handleSwatchClick }) => {

    const colorSwatchStyle = { 'backgroundColor': color };
    
    return (
        <div style={colorSwatchStyle} className={styles.swatchBox} onClick={handleSwatchClick}></div>
    );

};

export default ColorSwatch;