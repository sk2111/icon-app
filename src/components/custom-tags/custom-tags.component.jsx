//libs
import React, { useState } from 'react';
//css
import styles from './custom-tags.module.css';
//static
import { ReactComponent as DeleteTag } from '../../assests/delete-tag.svg';



const CustomTags = () => {

    const [tags, setTags] = useState([]);
    const [tagInputValue, setTagInputValue] = useState('');

    const ENTER_KEYCODE = 'Enter';

    const handleInputKeyPress = (eve) => {
        if (eve.key === ENTER_KEYCODE) {
            if (!tags.includes(tagInputValue)) {
                setTags([...tags, tagInputValue]);
                setTagInputValue('');
            }
        }
    };

    const handeInputChange = (eve) => {
        setTagInputValue(eve.target.value);
    };

    return (
        <div className={styles.tagContainer}>
            {
                tags.map((tagLabel) => {
                    return (
                        <span key={tagLabel} className={styles.tagLabel}>
                            <span>{tagLabel}</span>
                            <DeleteTag className={styles.deleteTag} />
                        </span>
                    );
                })
            }
            <input className={styles.inputField} type="text" value={tagInputValue}
                onKeyPress={handleInputKeyPress} onChange={handeInputChange} />
        </div>
    );
};


export default CustomTags;