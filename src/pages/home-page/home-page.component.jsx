import React, { useState } from 'react';
//css
import styles from './home-page.module.css';
//component
import ProtectedRoute from '../../components/protected-route/protected-route.component';
import HomeHeader from '../../components/home-header/home-header.component';

const HomePage = () => {
    const [navMenuExtended, setNavMenuExtended] = useState(true);

    const navigationStyle = navMenuExtended ? { width: '250px' } : { width: '70px' };

    return (
        <div className={styles.rootContainer}>
            <section style={navigationStyle} className={styles.leftContainer}></section>
            <section className={styles.rightContainer}>
                <section className={styles.rightHeader}>
                    <HomeHeader navMenuExtended={navMenuExtended} setNavMenuExtended={setNavMenuExtended} />
                </section>
                <section className={styles.rightContent}></section>
            </section>
        </div>
    );
};

export default ProtectedRoute(HomePage);