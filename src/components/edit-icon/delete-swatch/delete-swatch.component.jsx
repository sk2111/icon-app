//libs
import React, { useRef } from 'react';
//styles
import styles from './delete-swatch.module.css';
//component




const DeleteSwatch = ({ showDeleteZone, setShowDeleteZone, updateSwatchList }) => {

    const deleteZoneRef = useRef(null);

    const deleteZone = `${styles.deleteSwatchZone} ${showDeleteZone ? styles.visible : styles.hidden}`;


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

    const handleDeleteZoneDrop = (event) => {
        if (!deleteZoneRef.current) return;
        deleteZoneRef.current.style.boxShadow = "";
        const swatchColorToDelete = event.dataTransfer.getData('color');
        if (swatchColorToDelete) {
            updateSwatchList(swatchColorToDelete, true);
        }
        setShowDeleteZone(false);
    };

    return (
        <div ref={deleteZoneRef}
            className={deleteZone}
            onDragEnter={handleDeleteZoneEnter}
            onDragOver={handleDeleteZoneDragOver}
            onDragLeave={handleDeleteZoneLeave}
            onDrop={handleDeleteZoneDrop}>
            Delete Swatch
        </div>
    );
};

export default DeleteSwatch;