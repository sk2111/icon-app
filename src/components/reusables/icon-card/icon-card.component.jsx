//libs
import React from 'react';
//css
import styles from './icon-card.module.css';
//components
import RenderView from '../render-view/render-view.component';


const IconCard = ({ iconId, iconName, iconContainerClass, iconBase64, isCurrentUserAdmin, confirmDelete }) => {

    const actionContainer = `re-icon-action-container ${iconContainerClass}`;

    return (
        <div className="re-icon-dp-card">
            <div className={actionContainer}>
                <RenderView renderIfTrue={isCurrentUserAdmin}>
                    <div className={styles.actionIcon} onClick={() => { confirmDelete({ iconIdToDelete: iconId, isVisible: true }) }}>D</div>
                </RenderView>
                <div className={styles.actionIcon}>F</div>
            </div>
            <div className={styles.iconContainer}>
                <img className={styles.iconImg} src={`data:image/svg+xml;base64,${iconBase64}`} alt="" />
            </div>
            <div className={styles.iconName}>{iconName}</div>
        </div>
    );
};


export default IconCard;