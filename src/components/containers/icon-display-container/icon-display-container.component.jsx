//libs
import React from 'react';
//css
import styles from './icon-display-container.module.css';
//components
import IconCard from '../../reusables/icon-card/icon-card.component';
//constans
import { ICON_PROP } from '../../../utilities/app.constants';

const { ICON_ID, ICON_NAME } = ICON_PROP;

const IconDisplayContainer = ({ iconList }) => {
    return (
        <div className={styles.container}>
            {
                iconList.map((icon) => {
                    return (
                        <IconCard key={icon[ICON_ID]} iconName={icon[ICON_NAME]} />
                    );
                })
            }
        </div>
    );
};

export default IconDisplayContainer;