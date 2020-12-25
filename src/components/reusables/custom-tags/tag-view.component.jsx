//libs
import React from 'react';
//css
import styles from './tag-view.module.css';
//static
import DeleteTag from '../../../assests/webp/delete-tag.webp';


const TagView = ({ tags, deleteTag }) => {
    return (
        <React.Fragment>
            {
                tags.map((tagLabel) => {
                    return (
                        <div key={tagLabel} className={styles.tagLabel}>
                            <div>{tagLabel}</div>
                            <img className={styles.deleteTag} src={DeleteTag} alt="x" onClick={() => deleteTag(tagLabel)} />
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
};

export default TagView;