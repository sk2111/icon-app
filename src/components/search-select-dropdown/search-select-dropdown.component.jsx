//libs
import React, { useState } from 'react';
//css
import styles from './search-select-dropdown.module.css';
//static
import { ReactComponent as SearchLogo } from '../../assests/searchLogo.svg';

const SearchSelectDropdown = ({ className, placeholder, searchList }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [listHidden, setListHidden] = useState(true);

    const filteredList = searchList.filter((item) => item.includes(searchTerm));
    const searchListStyle = (listHidden || !filteredList.length) ? { height: '0px' } : {};

    console.log("the output", searchTerm, listHidden);
    const handleListSelect = (listVal) => {
        setListHidden(true);
        console.log("My value", listVal);
        setSearchTerm(listVal);
    };

    return (
        <div className={className}>
            <div className={styles.searchSelectContainer}>
                <div className={styles.inputLogoContainer}>
                    <input className={styles.searchInput} value={searchTerm} type="text" placeholder={placeholder}
                        onClick={() => setListHidden(false)} onChange={(e) => setSearchTerm(e.target.value)} />
                    <SearchLogo className={styles.searchLogo} />
                </div>
                <div style={searchListStyle} className={styles.searchListContainer}>
                    {filteredList.map(
                        (listVal) => <p key={listVal} className={styles.searchItem}
                            onClick={() => handleListSelect(listVal)}>{listVal}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

SearchSelectDropdown.defaultProps = {
    searchList: ['testerr', 'poda', 'sampler', 'variation', 'algo',
        'ennamo', 'nothing', 'new', 'testerr2', 'new2']
};

export default SearchSelectDropdown;