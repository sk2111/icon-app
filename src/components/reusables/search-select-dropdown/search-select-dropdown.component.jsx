//libs
import React, { useEffect, useRef, useState } from 'react';
//css
import styles from './search-select-dropdown.module.css';
//static
import { ReactComponent as SearchLens } from '../../../assests/searchLogo.svg';

const SearchSelectDropdown = ({ className, placeholder, defaultSearchValue,
    handleSearchValueChange, searchList }) => {

    const DEFAULT_DEBOUNCE_TIME = 1000;
    const ENTER_KEYNAME = 'Enter';

    const [searchTerm, setSearchTerm] = useState(defaultSearchValue);
    const [listHidden, setListHidden] = useState(true);
    const debounceTime = useRef({ time: 0 });


    const filteredList = searchList.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const searchListStyle = (listHidden || !filteredList.length) ? { maxHeight: '0px', transition: 'none', border: 'none' } : {};

    useEffect(() => {
        const timerId = setTimeout(() => {
            handleSearchValueChange(searchTerm);
        }, debounceTime.current.time);
        return () => clearTimeout(timerId);
    }, [searchTerm, handleSearchValueChange]);


    const handleValueChange = (e) => {
        debounceTime.current.time = DEFAULT_DEBOUNCE_TIME;
        setSearchTerm(e.target.value)
    };

    const handleInputKeyPress = (e) => {
        if (e.key === ENTER_KEYNAME) {
            e.target.blur();
            setListHidden(true);
        }
    };

    const handleListSelect = (listVal) => {
        debounceTime.current.time = 0;
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
                        onChange={handleValueChange}
                    />
                    <SearchLens className={styles.SearchLens} />
                </div>
                <div style={searchListStyle} className={styles.searchListContainer}>
                    {
                        filteredList.map((listVal) => {
                            return (
                                <p key={listVal}
                                    className={styles.searchItem}
                                    onMouseDown={() => handleListSelect(listVal)}>{listVal}</p>
                            );
                        })
                    }
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