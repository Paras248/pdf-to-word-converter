import React from "react";
import styles from "./css/Button.module.css";

const Button = (props) => {
    const Icon = props.icon;

    // initially icon is on right side
    let textTemplate = [
        <p key={0} style={{ flex: 1 }}>
            {props.text}
        </p>,
        <Icon className={styles.icon} key={1} />,
    ];

    // if you want icon on the left side
    if (props.text !== "Convert") {
        textTemplate = textTemplate.reverse();
    }

    return (
        <button type={props.type} onClick={props.onClick} className={styles.button}>
            {textTemplate}
        </button>
    );
};

export default React.memo(Button);
