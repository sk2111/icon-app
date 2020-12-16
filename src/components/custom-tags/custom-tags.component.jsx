//libs
import React, { useRef, useState } from 'react';
//css
import styles from './custom-tags.module.css';
//component
import TagView from '../tag-view/tag-view.component';

const CustomTags = ({ suggestionOptions }) => {

    const inpRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [tagInputValue, setTagInputValue] = useState('');
    const [tagInputFocussed, setTagInputFocussed] = useState(false);

    const ENTER_KEYCODE = 'Enter';

    const filteredList = suggestionOptions.filter((item) => item.toLowerCase().includes(tagInputValue.toLowerCase()));
    const suggestionListStyle = (tagInputFocussed && (filteredList.length)) ? {} : { maxHeight: '0px', transition: 'none', border: 'none' };

    const setTagsValue = (tagInputValue) => {
        const isMatchFound = tags.find(existingValue => existingValue.toLowerCase() === tagInputValue.toLowerCase());
        if (!isMatchFound && tagInputValue) {
            setTags([...tags, tagInputValue]);
            setTagInputValue('');
            setTimeout(() => {
                inpRef.current.scrollIntoView();
            }, 0);
        }
    };

    const handleInputKeyPress = (eve) => {
        if (eve.key === ENTER_KEYCODE) {
            setTagsValue(tagInputValue);
        }
    };

    const handeInputChange = (eve) => {
        setTagInputValue(eve.target.value);
    };

    const handleListSelect = (listVal) => {
        setTagsValue(listVal);
        setTagInputValue('');
    };

    const handleTagDelete = (deleteTagName) => {
        const filteredTags = tags.filter((tagName) => tagName !== deleteTagName);
        setTags([...filteredTags]);
    };

    return (
        <div className={styles.tagContainer}>
            <TagView tags={tags} deleteTag={handleTagDelete} />
            <div className={styles.inputContainer}>
                <input ref={inpRef} className={styles.inputField} type="text" value={tagInputValue}
                    onKeyPress={handleInputKeyPress} onChange={handeInputChange} />
                <div style={suggestionListStyle} className={styles.suggestionListContainer}>
                    {
                        filteredList.map((listVal) => {
                            return (
                                <p key={listVal}
                                    className={styles.suggestionItem}
                                    onMouseDown={() => handleListSelect(listVal)}>{listVal}</p>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

CustomTags.defaultProps = {
    suggestionOptions: ["Hello", "You", "No data", "Tackle", "Heaiiewe", "Testing", "mock", "value", "nothing"]
}


export default CustomTags;