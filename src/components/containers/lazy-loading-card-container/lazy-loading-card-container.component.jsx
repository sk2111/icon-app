//libs
import React from 'react';
//css
import styles from './lazy-loading-card-container.module.css';
//components
import LazyLoadingCard from '../../reusables/lazy-loading-card/lazy-loading-card.component';
//helpers
import { integerArray } from '../../../utilities/helper.functions';



const LazyLoadingCardContainer = () => {
    return (
        <React.Fragment>
            {
                integerArray().map((val, idx) => <LazyLoadingCard key={idx} />)
            }
        </React.Fragment>
    );
};

export default LazyLoadingCardContainer;