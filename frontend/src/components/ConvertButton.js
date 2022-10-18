import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./ConvertButton.module.css";

const ConvertButton = () => {
    return (
        <button className={styles.button} type="submit">
            <p>Convert</p> <ChevronRightIcon className={styles.icon} />
        </button>
    );
};

export default ConvertButton;
