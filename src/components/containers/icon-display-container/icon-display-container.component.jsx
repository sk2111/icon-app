//libs
import React from 'react';
//css
import styles from './icon-display-container.module.css';
//components
import IconCard from '../../reusables/icon-card/icon-card.component';



const IconDisplayContainer = ({ iconList }) => {
    return (
        <div className={styles.container}>
            {
                iconList.map(({ name }) => {
                    return (
                        <IconCard key={name} iconName={name} />
                    );
                })
            }
        </div>
    );
};

export default IconDisplayContainer;