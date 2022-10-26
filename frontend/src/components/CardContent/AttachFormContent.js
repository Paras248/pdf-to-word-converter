import React from "react";
import FileInput from "../UI/FileInput";
import DescriptionIcon from "@mui/icons-material/Description";
import styles from "./css/AttachFormContent.module.css";

const AttachFormContent = (props) => {
    return (
        <form className={styles["form-container"]} encType="multipart/form-data">
            <p key={0} className={styles["select-heading"]}>
                Select <DescriptionIcon className={styles["file-icon"]} /> to convert
            </p>
            <FileInput inputChangeHandler={props.setFile} />
            <p key={2} className={styles["file-name"]}>
                No file selected
            </p>
        </form>
    );
};

export default AttachFormContent;
