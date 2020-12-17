//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons-list.module.css';
//component
import CustomSelect from '../custom-select/custom-select.component';
//reselect selectors
import { selectUploadedCommonIcons } from '../../redux/upload-icons/upload-icons.selectors';




const ConfigureUploadIconsList = ({ uploadedIcons }) => {

    const selectStyles = { height: "26px", width: "108px" };

    return (
        <React.Fragment>
            {
                uploadedIcons.map(({ id, iconsBase64, iconTags, iconName, iconClassfication }) => {

                    return (
                        <div key={id} className={styles.listContainer}>
                            <div className={styles.imgContainer}>
                                <img className={styles.previewImage} src={`data:image/svg+xml;base64,${iconsBase64}`} alt="Invalid" />
                            </div>
                            <div className={styles.selectionZone}>
                                <div className={styles.iconName}>
                                    <div>{iconName}</div>
                                </div>
                                <CustomSelect style={selectStyles} options={["All", "1", "2", "3"]} defaultSelectValue={"1"} />
                            </div>
                            <div></div>
                        </div>
                    )
                })
            }
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadedIcons: selectUploadedCommonIcons,
});

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFilesToCommonIcons: (icons) => { dispatch((icons)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIconsList);