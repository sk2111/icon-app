//libs
import React, { useEffect, useRef, useState } from 'react';
//css
import styles from './custom-tags.module.css';
//component
import TagView from '../../tag-view/tag-view.component';

const CustomTags = ({ suggestionOptions }) => {

    const inpRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [tagInputValue, setTagInputValue] = useState('');
    const [tagInputFocussed, setTagInputFocussed] = useState(false);
    const [tagSuggestionAlignLeft, setTagSuggestionAlignLeft] = useState(false);

    const ENTER_KEYCODE = 'Enter';

    const filteredList = suggestionOptions.filter(
        (item) => (item.toLowerCase().includes(tagInputValue.toLowerCase()) && !tags.includes(item))
    );
    const showHideSuggestionList = (tagInputFocussed && (filteredList.length)) ? {} : { maxHeight: '0px', transition: 'none', border: 'none' };
    const suggestionListStyle = tagSuggestionAlignLeft ? { ...showHideSuggestionList, "right": "8px" } : showHideSuggestionList;

    useEffect(() => {
        if (inpRef) {
            const inputWidth = inpRef.current.getBoundingClientRect().width;
            if (inputWidth) {
                setTagSuggestionAlignLeft(inputWidth < 208);
            }
            inpRef.current.scrollIntoView();
        }
    }, [tagInputValue, tags]);

    const setTagsValue = (tagInputValue) => {
        const isMatchFound = tags.find(existingValue => existingValue.toLowerCase() === tagInputValue.toLowerCase());
        if (!isMatchFound && tagInputValue) {
            setTags([...tags, tagInputValue]);
            setTagInputValue('');
        }
    };

    const handleInputKeyPress = (eve) => {
        if (eve.key === ENTER_KEYCODE) {
            setTagsValue(tagInputValue);
        }
    };

    const handleTagDelete = (deleteTagName) => {
        const filteredTags = tags.filter((tagName) => tagName !== deleteTagName);
        setTags([...filteredTags]);
    };

    return (
        <div className={styles.tagOuterContainer}>
            <div className={styles.tagContainer}>
                <TagView tags={tags} deleteTag={handleTagDelete} />
                <div className={styles.inputContainer}>
                    <input
                        ref={inpRef}
                        className={styles.inputField}
                        type="text"
                        value={tagInputValue}
                        onKeyPress={handleInputKeyPress}
                        onFocus={() => setTagInputFocussed(true)}
                        onBlur={() => setTagInputFocussed(false)}
                        onChange={(eve) => setTagInputValue(eve.target.value)} />
                    <div style={suggestionListStyle} className={styles.suggestionListContainer}>
                        {
                            filteredList.map((listVal) => {
                                return (
                                    <p key={listVal}
                                        className={styles.suggestionItem}
                                        onMouseDown={() => setTagsValue(listVal)}>{listVal}</p>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};


CustomTags.defaultProps = {
    suggestionOptions: ["Mock", "test", 'NewData', "oldData"]
}

export default CustomTags;