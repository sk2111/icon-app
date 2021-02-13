//libs
import React, { useState } from 'react';
//css
import styles from './icons-display-container.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
import IconCard from '../../reusables/icon-card/icon-card.component';
import CreateModalCard from '../../reusables/create-modal-card/create-modal-card.component';
import LazyLoadingCardContainer from '../lazy-loading-card-container/lazy-loading-card-container.component';
import LazyLoadingCardWithEvent from '../../reusables/lazy-loading-card/lazy-loading-card-with-event';
//assests
import NotFoundImg from '../../../assests/webp/not-found.webp';
//constans
import { ICON_PROP, NO_MORE_ICONS_MESSAGE, ICON_STY_LENGTH_LIMIT } from '../../../utilities/app.constants';

const { ICON_ID } = ICON_PROP;

const IconDisplayContainer = ({ iconList, isMoreIconsAvaliableToFetch, fetchMoreIcons, isCurrentUserAdmin,
    handleDeleteIcon, handleFavoriteSelection, handleEditIcon }) => {

    const DEFAULT_MODAL_STATE = { iconIdToDelete: null, isVisisble: false };
    const [showDeleteModal, setShowDeleteModal] = useState({ ...DEFAULT_MODAL_STATE });
    const { iconIdToDelete, isVisible } = showDeleteModal;

    const userMessage = iconList.length ? NO_MORE_ICONS_MESSAGE : '';
    const iconContainerClass = isCurrentUserAdmin ? styles.iconContainerAlignBetween : styles.iconContainerAlignEnd;
    const displayContainer = styles.container + ' ' +
        (iconList.length < ICON_STY_LENGTH_LIMIT ? styles.smallList : styles.largeList);

    const handleDeleteIconAction = (iconId) => {
        setShowDeleteModal({ ...DEFAULT_MODAL_STATE });
        handleDeleteIcon(iconId);
    };

    return (
        <div className={styles.overflowContainer}>
            <div className={displayContainer}>
                {
                    iconList.map((icon) => {
                        return (
                            <IconCard
                                key={icon[ICON_ID]}
                                iconConfig={icon}
                                iconContainerClass={iconContainerClass}
                                isCurrentUserAdmin={isCurrentUserAdmin}
                                handleFavoriteSelection={handleFavoriteSelection}
                                confirmDelete={setShowDeleteModal}
                                editSelectedIcon={handleEditIcon}
                            />

                        );
                    })
                }
                <RenderView renderIfTrue={isMoreIconsAvaliableToFetch}>
                    <LazyLoadingCardWithEvent fetchMoreIcons={fetchMoreIcons} />
                    <LazyLoadingCardContainer />
                </RenderView>
                <RenderView renderIfFalse={isMoreIconsAvaliableToFetch}>
                    <div className={styles.userMessage}>{userMessage}</div>
                </RenderView>
                <RenderView renderIfTrue={isVisible && isCurrentUserAdmin}>
                    <CreateModalCard className={styles.deleteCard}>
                        <h6 className={styles.confirmHeader}>Are you sure you want to delete icon?</h6>
                        <div className={styles.confirmBtnContainer}>
                            <button className={styles.cancelButton} onClick={() => setShowDeleteModal({ ...DEFAULT_MODAL_STATE })}>Cancel</button>
                            <button className={styles.proceedButton} onClick={() => handleDeleteIconAction(iconIdToDelete)} >OK</button>
                        </div>
                    </CreateModalCard>
                </RenderView>
            </div>
            <RenderView renderIfTrue={(iconList.length === 0) && !isMoreIconsAvaliableToFetch}>
                <div>
                    <img className={styles.notFoundSvg} src={NotFoundImg} alt=""/>
                </div>
            </RenderView>
        </div>
    );
};

export default IconDisplayContainer;