//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-preview.module.css';
//reselect
import { selectIconToEdit } from '../../../redux/edit-icon/edit-icon.selectors';
//helpers
import { sanitizeSvg } from '../../../utilities/helper.functions';


const EditIconPreview = ({ iconToEdit }) => {

    const { iconName, iconData } = iconToEdit;


    return (
        <div className={styles.container}>
            <div className={styles.svgInfo}>{iconName}</div>
            <div className={styles.svgPreview}>
                <div className="re_editSelectedSvgContainer" dangerouslySetInnerHTML={{ __html: sanitizeSvg(iconData) }}>
                </div>
            </div>
            <div className={styles.usageInfo}>
                <div className={styles.recommendText}>RECOMMENDED FOR</div>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    iconToEdit: selectIconToEdit
});

export default connect(mapStateToProps)(EditIconPreview);