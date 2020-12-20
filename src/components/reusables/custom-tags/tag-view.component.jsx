//libs
import React from 'react';
//css
import styles from './tag-view.module.css';
//static
import { ReactComponent as DeleteTag } from '../../../assests/delete-tag.svg';


const TagView = ({ tags, deleteTag }) => {
    return (
        <React.Fragment>
            {
                tags.map((tagLabel) => {
                    return (
                        <div key={tagLabel} className={styles.tagLabel}>
                            <div>{tagLabel}</div>
                            <DeleteTag className={styles.deleteTag} onClick={() => deleteTag(tagLabel)} />
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
};

export default TagView;