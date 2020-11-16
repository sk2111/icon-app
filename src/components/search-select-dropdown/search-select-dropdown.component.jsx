//libs
import React, { useState } from 'react';
//css
import styles from './search-select-dropdown.module.css';
//static
import { ReactComponent as SearchLens } from '../../assests/searchLogo.svg';
//constants
import { ENTER_KEYNAME } from './search-select-dropdown.constants';

const SearchSelectDropdown = ({ className, placeholder, searchList }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [listHidden, setListHidden] = useState(true);

    const filteredList = searchList.filter((item) => item.includes(searchTerm));
    const searchListStyle = (listHidden || !filteredList.length) ? { height: '0px' } : {};

    const handleInputKeyPress = (e) => {
        if (e.key === ENTER_KEYNAME) {
            e.target.blur();
            setListHidden(true);
        }
    };

    const handleListSelect = (listVal) => {
        setListHidden(true);
        setSearchTerm(listVal);
    };

    return (
        <div className={className}>
            <div className={styles.searchSelectContainer}>
                <div className={styles.inputLogoContainer}>
                    <input
                        className={styles.searchInput}
                        value={searchTerm}
                        type="text"
                        placeholder={placeholder}
                        onFocus={() => setListHidden(false)}
                        onBlur={() => setListHidden(true)}
                        onKeyPress={handleInputKeyPress}
                        onClick={() => setListHidden(false)}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchLens className={styles.SearchLens} />
                </div>
                <div style={searchListStyle} className={styles.searchListContainer}>
                    {filteredList.map(
                        (listVal) => <p key={listVal} className={styles.searchItem}
                            onMouseDown={() => handleListSelect(listVal)}>{listVal}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

SearchSelectDropdown.defaultProps = {
    searchList: ['testerr', 'poda', 'sampler', 'variation', 'algo',
        'ennamo', 'nothing', 'new', 'testerr2', 'object']
};

export default SearchSelectDropdown;