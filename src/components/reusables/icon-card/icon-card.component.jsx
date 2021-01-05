//libs
import React from 'react';
//css
import styles from './icon-card.module.css';
//components
import RenderView from '../render-view/render-view.component';
//static
import DeleteIcon from '../../../assests/png/delete-icon.png';
import FavoriteIcon from '../../../assests/png/favorite-icon.png';
import NotFavoriteIcon from '../../../assests/png/not-favorite-icon.png';


const IconCard = ({ iconId, iconName, iconContainerClass, iconBase64, isCurrentUserAdmin, isFavorite,
    handleFavoriteSelection, confirmDelete }) => {

    const actionContainer = `re-icon-action-container ${iconContainerClass}`;

    return (
        <div className="re-icon-dp-card">
            <div className={actionContainer}>
                <RenderView renderIfTrue={isCurrentUserAdmin}>
                    <img className={styles.actionIcon} alt="D" src={DeleteIcon}
                        onClick={() => { confirmDelete({ iconIdToDelete: iconId, isVisible: true }) }} />
                </RenderView>
                <RenderView renderIfTrue={isFavorite}>
                    <img className={styles.actionIcon} alt="-" src={FavoriteIcon}
                        onClick={() => handleFavoriteSelection({ id: iconId, value: false })} />
                </RenderView>
                <RenderView renderIfFalse={isFavorite}>
                    <img className={styles.actionIcon} alt="-" src={NotFavoriteIcon}
                        onClick={() => handleFavoriteSelection({ id: iconId, value: true })}/>
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