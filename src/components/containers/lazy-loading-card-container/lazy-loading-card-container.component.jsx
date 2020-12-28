//libs
import React from 'react';
//components
import LazyLoadingCard from '../../reusables/lazy-loading-card/lazy-loading-card.component';
//helpers
import { integerArray } from '../../../utilities/helper.functions';



const LazyLoadingCardContainer = () => {
    return (
        <React.Fragment>
            {
                integerArray().map((val) => <LazyLoadingCard key={val} />)
            }
        </React.Fragment>
    );
};

export default LazyLoadingCardContainer;