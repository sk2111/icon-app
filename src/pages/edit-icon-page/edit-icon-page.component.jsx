//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-page.module.css';
//components
import HomeHeader from '../../components/containers/home-header/home-header.component';
import IconsViewHeader from '../../components/containers/icons-view-header/icons-view-header.component';
//static
import { ReactComponent as UnderConstructuction } from '../../assests/under-construction.svg';

const EditIconPage = () => {
    return (
        <div className={styles.pageContainer}>
            <HomeHeader hideSearch={true} hideSelect={true} />
            <div className={styles.viewContainer}>
                <IconsViewHeader label={''} showUploadButton={false} />
                <div className={styles.placeholder}>
                    <UnderConstructuction />
                    <div className={styles.placeholderText}> Under construction :)</div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    test: () => 'test'
});

export default connect(mapStateToProps)(EditIconPage);