import React from 'react';
//css
import styles from './general-icons-page.module.css';
//components
import IconsPageHeader from '../../components/icons-page-header/icons-page-header.component';

const GeneralIconsPage = () => {
    return (
        <div className={styles.viewContainer}>
            <IconsPageHeader showButton />
        </div>
    );
};


export default GeneralIconsPage;