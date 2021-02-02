//libs
import React, { useRef, useState } from 'react';
//styles
import styles from './delete-swatch.module.css';


const DeleteSwatch = ({ showDeleteZone, setShowDeleteZone, updateSwatchList }) => {

    const deleteZoneRef = useRef(null);
    const [deleteHover, setDeleteHover] = useState(false);

    const deleteZoneVisiblity = `${styles.deleteSwatchZone} ${showDeleteZone ? styles.visible : styles.hidden}`;
    const deleteZoneStyles = deleteHover ? `${deleteZoneVisiblity} ${styles.deleteZoneHover}` : deleteZoneVisiblity;

    const handleDeleteZoneEnter = (event) => {
        event.dataTransfer.dropEffect = "move";
        if (!deleteZoneRef.current) return;
        setDeleteHover(true);
    };

    const handleDeleteZoneDragOver = (event) => {
        event.dataTransfer.dropEffect = "move";
        event.preventDefault();
    };

    const handleDeleteZoneLeave = () => {
        if (!deleteZoneRef.current) return;
        setDeleteHover(false);
    };

    const handleDeleteZoneDrop = (event) => {
        if (!deleteZoneRef.current) return;
        const swatchColorToDelete = event.dataTransfer.getData('color');
        if (swatchColorToDelete) {
            updateSwatchList(swatchColorToDelete, true);
        }
        setDeleteHover(false);
        setShowDeleteZone(false);
    };

    return (
        <div ref={deleteZoneRef}
            className={deleteZoneStyles}
            onDragEnter={handleDeleteZoneEnter}
            onDragOver={handleDeleteZoneDragOver}
            onDragLeave={handleDeleteZoneLeave}
            onDrop={handleDeleteZoneDrop}>
            Delete Swatch
        </div>
    );
};

export default DeleteSwatch;