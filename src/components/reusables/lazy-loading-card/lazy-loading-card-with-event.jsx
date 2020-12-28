//libs
import React, { useRef, useEffect } from 'react';
//css
import styles from './lazy-loading-card.module.css';



const intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const LazyLoadingCardWithEvent = ({ fetchMoreIcons }) => {

    const intersectionRef = useRef(null);

    useEffect(() => {
        const intersectionCallback = (entries) => {
            entries.forEach(entry => {
                console.log("I am intersecting observor konj", entry.isIntersecting);
                if (entry.isIntersecting) {
                    fetchMoreIcons();
                }
            });
        };
        const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
        observer.observe(intersectionRef.current);
        return () => {
            observer.disconnect();
        }
    });

    return (
        <div ref={intersectionRef} className={styles.card}>
            <div className={styles.iconContainer}>
                <div className={styles.iconImg}></div>
            </div>
            <div className={styles.iconName}></div>
        </div>
    );
};

LazyLoadingCardWithEvent.defaultProps = {
    fetchMoreIcons: () => { }
};

export default LazyLoadingCardWithEvent;