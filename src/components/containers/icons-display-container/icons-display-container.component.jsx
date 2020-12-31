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
//constans
import { ICON_PROP, NO_ICONS_FOUND_MESSAGE, NO_MORE_ICONS_MESSAGE } from '../../../utilities/app.constants';

const { ICON_ID, ICON_NAME, ICON_BASE_64 } = ICON_PROP;

const IconDisplayContainer = ({ iconList, isMoreIconsAvaliableToFetch, fetchMoreIcons, isCurrentUserAdmin, handleDeleteIcon }) => {

    const DEFAULT_MODAL_STATE = { iconIdToDelete: null, isVisisble: false };
    const [showDeleteModal, setShowDeleteModal] = useState({ ...DEFAULT_MODAL_STATE });
    const { iconIdToDelete, isVisible } = showDeleteModal;

    const iconContainerStyle = isCurrentUserAdmin ? {} : { 'justifyContent': 'flex-end' };
    const userMessage = iconList.length ? NO_MORE_ICONS_MESSAGE : NO_ICONS_FOUND_MESSAGE;

    const handleDeleteIconAction = (iconId) => {
        setShowDeleteModal({ ...DEFAULT_MODAL_STATE });
        handleDeleteIcon(iconId);
    };

    return (
        <div className={styles.container}>
            {
                iconList.map((icon) => {
                    return (
                        <IconCard
                            key={icon[ICON_ID]}
                            iconId={icon[ICON_ID]}
                            iconContainerStyle={iconContainerStyle}
                            iconName={icon[ICON_NAME]}
                            iconBase64={icon[ICON_BASE_64]}
                            isCurrentUserAdmin={isCurrentUserAdmin}
                            confirmDelete={setShowDeleteModal} />
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
                    <h6 className={styles.confirmHeader}>Warning !</h6>
                    <p className={styles.confirmDetails}>Icon will be deleted permanently from database...</p>
                    <div className={styles.confirmBtnContainer}>
                        <button className={styles.cancelButton} onClick={() => setShowDeleteModal({ ...DEFAULT_MODAL_STATE })}>Cancel</button>
                        <button className={styles.proceedButton} onClick={() => handleDeleteIconAction(iconIdToDelete)} > Proceed</button>
                    </div>
                </CreateModalCard>
            </RenderView>
        </div>
    );
};

export default IconDisplayContainer;