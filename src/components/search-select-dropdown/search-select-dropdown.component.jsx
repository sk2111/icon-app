//libs
import React, { useEffect, useState } from 'react';
//css
import styles from './search-select-dropdown.module.css';
//static
import { ReactComponent as SearchLens } from '../../assests/searchLogo.svg';

const SearchSelectDropdown = ({ className, placeholder, defaultSearchValue,
    handleSearchValueChange, searchList }) => {

    const [searchTerm, setSearchTerm] = useState(defaultSearchValue);
    const [listHidden, setListHidden] = useState(true);

    const ENTER_KEYNAME = 'Enter';
    const DROPDOWN_CLOSE_TIME = '150'; // millisec
    const DEBOUNCE_TIME = 700; //millisec

    const filteredList = searchList.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const searchListStyle = (listHidden || !filteredList.length) ? { maxHeight: '0px', border: 'none' } : {};


    useEffect(() => {
        const timerId = setTimeout(() => {
            handleSearchValueChange(searchTerm);
        }, DEBOUNCE_TIME);
        return () => clearTimeout(timerId);
    }, [searchTerm, handleSearchValueChange]);


    const handleInputKeyPress = (e) => {
        if (e.key === ENTER_KEYNAME) {
            e.target.blur();
            setListHidden(true);
        }
    };

    const handleListSelect = (listVal) => {
        setListHidden(true);
        setTimeout(() => {
            // Adding small delay beacause clicking one item will filter the list 
            //and the list become 1 so small glitch in UI 
            setSearchTerm(listVal);
        }, DROPDOWN_CLOSE_TIME);
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
    defaultSearchValue: '',
    handleSearchValueChange: () => { },
    searchList: []
};

export default SearchSelectDropdown;