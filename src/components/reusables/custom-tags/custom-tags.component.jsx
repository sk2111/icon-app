//libs
import React, { useEffect, useRef, useState } from 'react';
//css
import styles from './custom-tags.module.css';
//component
import TagView from './tag-view.component';
import RenderView from '../render-view/render-view.component';

const CustomTags = ({ suggestionOptions, className, tags, handleTagsUpdate }) => {

    const parentContainerRef = useRef(null);
    const inpRef = useRef(null);
    const [tagInputValue, setTagInputValue] = useState('');
    const [tagInputFocussed, setTagInputFocussed] = useState(false);
    const [tagSuggestionAlignLeft, setTagSuggestionAlignLeft] = useState(false);

    const ENTER_KEYCODE = 'Enter';
    const ALIGN_LEFT_ON_INPUT_WIDTH = 208;
    const filteredList = tagInputFocussed ? suggestionOptions.filter(
        (item) => (item.toLowerCase().includes(tagInputValue.toLowerCase()) && !tags.includes(item))
    ) : suggestionOptions;

    const containerClass = styles.tagContainer + ' ' + className;
    const showHideSuggestionList = (filteredList.length) ? ' ' : styles.hideSuggestionList;
    const suggestionContainerClass = `${styles.suggestionListContainer} ${showHideSuggestionList} ` + (tagSuggestionAlignLeft ? styles.rightAlign : ' ');

    useEffect(() => {
        if (inpRef && tags.length && parentContainerRef.current) {
            const inputWidth = inpRef.current.getBoundingClientRect().width;
            if (inputWidth) {
                setTagSuggestionAlignLeft(inputWidth < ALIGN_LEFT_ON_INPUT_WIDTH);
                parentContainerRef.current.scrollBy(0, inpRef.current.offsetTop);
            }
        }
    }, [tagInputValue, tags]);

    const setTagsValue = (tagInputValue) => {
        const isMatchFound = tags.find(existingValue => existingValue.toLowerCase() === tagInputValue.toLowerCase());
        if (!isMatchFound && tagInputValue) {
            handleTagsUpdate([...tags, tagInputValue]);
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
        handleTagsUpdate([...filteredTags]);
    };

    return (
        <div className={styles.tagOuterContainer}>
            <div ref={parentContainerRef} className={containerClass}>
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
                    <RenderView renderIfTrue={tagInputFocussed}>
                        <div className={suggestionContainerClass}>
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
                    </RenderView>
                </div>
            </div>
        </div>
    );
};


CustomTags.defaultProps = {
    suggestionOptions: [],
    tags: [],
    handleTagsUpdate: () => { }
}

export default CustomTags;