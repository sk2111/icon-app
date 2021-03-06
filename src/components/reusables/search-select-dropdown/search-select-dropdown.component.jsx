//libs
import React, { useEffect, useRef, useState } from 'react';
//css
import styles from './search-select-dropdown.module.css';
//static
import SearchLens from '../../../assests/webp/searchLogo.webp';

const SearchSelectDropdown = ({ className, placeholder, defaultSearchValue,
    handleSearchValueChange, searchList }) => {

    const DEFAULT_DEBOUNCE_TIME = 1000;
    const ENTER_KEYNAME = 'Enter';

    const [searchTerm, setSearchTerm] = useState(defaultSearchValue);
    const [listHidden, setListHidden] = useState(true);
    const compRef = useRef({ time: 0 });
    compRef.current.defaultValue = defaultSearchValue; // To avoid uneccary trigger on acions we store previosu valid value

    const filteredList = (listHidden || !searchTerm) ? searchList : searchList.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const searchListClass = styles.searchListContainer + ' ' + ((listHidden || !filteredList.length) ? styles.hideList : '');

    useEffect(() => {
        if (compRef.current.defaultValue !== searchTerm) {
            const timerId = setTimeout(() => {
                handleSearchValueChange(searchTerm.trim());
            }, compRef.current.time);
            return () => clearTimeout(timerId);
        }
    }, [searchTerm, handleSearchValueChange]);


    const handleValueChange = (e) => {
        compRef.current.time = DEFAULT_DEBOUNCE_TIME;
        setSearchTerm(e.target.value);
        if (listHidden) {
            setListHidden(false);
        };
    };

    const handleInputKeyPress = (e) => {
        if (e.key === ENTER_KEYNAME) {
            e.target.blur();
            setListHidden(true);
        }
    };

    const handleOptionsListSelect = (listVal) => {
        compRef.current.time = 0;
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
                    <img className={styles.SearchLens} src={SearchLens} alt="" />
                </div>
                <div className={searchListClass}>
                    {
                        filteredList.map((listVal) => {
                            return (
                                <p key={listVal}
                                    className={styles.searchItem}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleOptionsListSelect(listVal)}>
                                    {listVal}
                                </p>
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