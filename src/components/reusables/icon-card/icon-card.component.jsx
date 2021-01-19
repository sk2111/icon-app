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
    const actionContainer = `${styles.iconActionContainer} ${iconContainerClass}`;


    const handleFavoriteIconClick = (e, isFavorite) => {
        e.stopPropagation();
        handleFavoriteSelection({ id: iconId, value: isFavorite });
    };

    const handleIconDeletion = (e) => {
        e.stopPropagation();
        confirmDelete({ iconIdToDelete: iconId, isVisible: true });
    };

    return (
        <div className={styles.iconDisplayCard} onClick={() => editSelectedIcon({ id: iconId, iconName, iconData })}>
            <div className={actionContainer}>
                <RenderView renderIfTrue={isCurrentUserAdmin}>
                    <img className={styles.actionIcon} alt="D" src={DeleteIcon}
                        onClick={handleIconDeletion} />
                </RenderView>
                <RenderView renderIfFalse={isFavorite}>
                    <img className={styles.actionIcon} alt="-" src={NotFavoriteIcon}
                        onClick={(e) => handleFavoriteIconClick(e, true)} />
                </RenderView>
            </div>
            <RenderView renderIfTrue={isFavorite}>
                <img className={styles.actionIconFavorite} alt="-" src={FavoriteIcon}
                    onClick={(e) => handleFavoriteIconClick(e, false)} />
            </RenderView>
            <div className={styles.editContainer}>
                <div className={styles.iconContainer}>
                    <img className={styles.iconImg} src={`data:image/svg+xml;base64,${iconBase64}`} alt="" />
                </div>
                <div className={styles.iconName}>{iconName}</div>
            </div>
        </div>
    );
};


export default IconCard;