//libs
import React from 'react';
//css
import styles from './icon-card.module.css';
//components
import RenderView from '../render-view/render-view.component';


const IconCard = ({ iconId, iconName, iconContainerClass, iconBase64, isCurrentUserAdmin, isFavorite,
    handleFavoriteSelection, confirmDelete }) => {

    const actionContainer = `re-icon-action-container ${iconContainerClass}`;

    return (
        <div className="re-icon-dp-card">
            <div className={actionContainer}>
                <RenderView renderIfTrue={isCurrentUserAdmin}>
                    <div className={styles.actionIcon} onClick={() => { confirmDelete({ iconIdToDelete: iconId, isVisible: true }) }}>D</div>
                </RenderView>
                <RenderView renderIfTrue={isFavorite}>
                    <div className={styles.actionIcon} onClick={() => handleFavoriteSelection({ id: iconId, isFavorite: false })}>FA</div>
                </RenderView>
                <RenderView renderIfFalse={isFavorite}>
                    <div className={styles.actionIcon} onClick={() => handleFavoriteSelection({ id: iconId, isFavorite: true })}>NF</div>
                </RenderView>
            </div>
            <div className={styles.iconContainer}>
                <img className={styles.iconImg} src={`data:image/svg+xml;base64,${iconBase64}`} alt="" />
            </div>
            <div className={styles.iconName}>{iconName}</div>
        </div>
    );
};


export default IconCard;