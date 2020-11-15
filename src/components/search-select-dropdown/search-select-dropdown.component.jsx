//libs
import React from 'react';
//css
import styles from './search-select-dropdown.module.css';

const SearchSelectDropdown = ({ className, placeholder }) => {
    return (
        <div className={className}>
            <input className={styles.searchInput} type="text" placeholder={placeholder} />
        </div>
    );
};

export default SearchSelectDropdown;