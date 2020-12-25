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
    const [showSuggestionList, setShowSuggestionList] = useState(false);
    const [suggestionTagAlignLeft, setSuggestionTagAlignLeft] = useState(false);

    const ENTER_KEYCODE = 'Enter';
    const ALIGN_LEFT_ON_INPUT_WIDTH = 208;
    const filteredList = showSuggestionList ? suggestionOptions.filter(
        (item) => (item.toLowerCase().includes(tagInputValue.toLowerCase()) && !tags.includes(item))
    ) : suggestionOptions;

    const containerClass = styles.tagContainer + ' ' + className;
    const showHideSuggestionList = (filteredList.length) ? ' ' : styles.hideSuggestionList;
    const suggestionContainerClass = `${styles.suggestionListContainer} ${showHideSuggestionList} ` + (suggestionTagAlignLeft ? styles.rightAlign : ' ');

    useEffect(() => {
        if (inpRef && parentContainerRef.current) {
            const inputWidth = inpRef.current.getBoundingClientRect().width;
            if (inputWidth) {
                setSuggestionTagAlignLeft(inputWidth < ALIGN_LEFT_ON_INPUT_WIDTH);
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
                        onFocus={() => setShowSuggestionList(true)}
                        onBlur={() => setShowSuggestionList(false)}
                        onClick={() => setShowSuggestionList(true)}
                        onChange={(eve) => {
                            setTagInputValue(eve.target.value);
                            setShowSuggestionList(true);
                        }} />
                    <RenderView renderIfTrue={showSuggestionList}>
                        <div className={suggestionContainerClass}>
                            {
                                filteredList.map((listVal) => {
                                    return (
                                        <p key={listVal}
                                            className={styles.suggestionItem}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                setShowSuggestionList(false);
                                                setTagsValue(listVal);
                                            }}>
                                            {listVal}
                                        </p>
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