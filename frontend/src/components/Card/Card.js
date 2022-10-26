import React from "react";
import AttachFormContent from "../CardContent/AttachFormContent";
import ConvertFormContent from "../CardContent/ConvertFormContent";
import DownloadFormContent from "../CardContent/DownloadFormContent";
import styles from "./css/Card.module.css";
import useFile from "../../hooks/useFile";

const Card = (props) => {
    const [file, setFile] = useFile();
    return (
        <div className={styles.container}>
            <div className={styles["file-main-container"]}>
                <div className={styles["file-sub-container"]}>
                    {!file.file && <AttachFormContent file={file} setFile={setFile} />}
                    {props.convert && <ConvertFormContent />}
                    {props.download && <DownloadFormContent />}
                </div>
            </div>
        </div>
    );
};

export default Card;
