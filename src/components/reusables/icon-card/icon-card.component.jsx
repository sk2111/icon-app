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
//constants
import { ICON_PROP } from '../../../utilities/app.constants';

const { ICON_ID, ICON_NAME, ICON_BASE_64, ICON_FAVORITE, ICON_DATA } = ICON_PROP;

const IconCard = ({ iconConfig, iconContainerClass, isCurrentUserAdmin, handleFavoriteSelection,
    confirmDelete, editSelectedIcon }) => {

    const { [ICON_ID]: iconId, [ICON_DATA]: iconData, [ICON_NAME]: iconName,
        [ICON_BASE_64]: iconBase64, [ICON_FAVORITE]: isFavorite } = iconConfig;
    const actionContainer = `re-icon-action-container ${iconContainerClass}`;

    return (
        <div className="re-icon-dp-card">
            <div className={actionContainer}>
                <RenderView renderIfTrue={isCurrentUserAdmin}>
                    <img className={styles.actionIcon} alt="D" src={DeleteIcon}
                        onClick={() => { confirmDelete({ iconIdToDelete: iconId, isVisible: true }) }} />
                </RenderView>
                <RenderView renderIfFalse={isFavorite}>
                    <img className={styles.actionIcon} alt="-" src={NotFavoriteIcon}
                        onClick={() => handleFavoriteSelection({ id: iconId, value: true })} />
                </RenderView>
            </div>
            <RenderView renderIfTrue={isFavorite}>
                <img className={styles.actionIconFavorite} alt="-" src={FavoriteIcon}
                    onClick={() => handleFavoriteSelection({ id: iconId, value: false })} />
            </RenderView>
            <div className={styles.editContainer} onClick={() => editSelectedIcon({ id: iconId, iconName, iconData })}>
                <div className={styles.iconContainer}>
                    <img className={styles.iconImg} src={`data:image/svg+xml;base64,${iconBase64}`} alt="" />
                </div>
                <div className={styles.iconName}>{iconName}</div>
            </div>
        </div>
    );
};


export default IconCard;