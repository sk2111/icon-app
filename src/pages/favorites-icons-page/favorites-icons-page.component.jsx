//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './favorites-icons-page.module.css';
//components
import IconsViewHeader from '../../components/icons-view-header/icons-view-header.component';
//constants
import { FAVORITES_ICONS_HEADER_LABEL } from '../../utilities/app.constants';


const FavoritesIconsPage = () => {
    return (
        <div className={styles.viewContainer}>
            <IconsViewHeader label={FAVORITES_ICONS_HEADER_LABEL} showUploadButton={false} />
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    test: () => 'test'
});

export default connect(mapStateToProps)(FavoritesIconsPage);