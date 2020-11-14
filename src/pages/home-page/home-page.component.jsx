import React from 'react';
//css
import styles from './home-page.module.css';
//component
import ProtectedRoute from '../../components/protected-route/protected-route.component';

const HomePage = () => {
    return (
        <div className={styles.rootContainer}>
            <section className={styles.leftContainer}></section>
            <section className={styles.rightContainer}>
                <section className={styles.rightHeader}></section>
                <section className={styles.rightContent}></section>
            </section>
        </div>
    );
};

export default ProtectedRoute(HomePage);