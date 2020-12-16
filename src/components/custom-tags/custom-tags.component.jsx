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
            if (!tags.includes(tagInputValue) && tagInputValue) {
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
                        <div key={tagLabel} className={styles.tagLabel}>
                            <div>{tagLabel}</div>
                            <DeleteTag className={styles.deleteTag} />
                        </div>
                    );
                })
            }
            <div className={styles.inputContainer}>
                <input className={styles.inputField} type="text" value={tagInputValue}
                    onKeyPress={handleInputKeyPress} onChange={handeInputChange} />
            </div>
        </div>
    );
};


export default CustomTags;