//libs
import React from 'react';
//css
import styles from './icon-card.module.css';
//components
import RenderView from '../render-view/render-view.component';


const IconCard = ({ iconId, iconName, iconBase64, isCurrentUserAdmin, confirmDelete }) => {
    return (
        <div className="re-icon-dp-card" onClick={() => { confirmDelete({ iconIdToDelete: iconId, isVisible: true }) }}>
            <div className="re-icon-action-container">
                <RenderView renderIfTrue={isCurrentUserAdmin}>
                    <div className={styles.actionIcon}>D</div>
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