import React from "react";
import styles from "./DownloadButton.module.css";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadButton = (props) => {
    const onButtonClick = () => {
        // saveAs(
        //     "https://res.cloudinary.com/dwx9da9n6/raw/upload/v1666109498/docs/ckam2okq3yrnbdvctgfq.docx"
        // );
        saveAs(`${props.fileUrl}`);
    };
    return (
        <button className={styles["button"]} onClick={onButtonClick}>
            <DownloadIcon style={{ marginRight: 5 }} />
            Download
        </button>
    );
};

export default DownloadButton;
