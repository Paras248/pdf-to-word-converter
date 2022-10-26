import { useState } from "react";

const useFile = () => {
    const [file, setFile] = useState({
        file: null,
        fileName: "",
    });

    const inputChangeHandler = (e) => {
        let fileName = e.target.files["0"].name;
        fileName = fileName.split(".")[0];
        if (fileName.length >= 23) {
            fileName = `${fileName.substr(0, 17)}..`;
        }
        setFile({ body: e.target.files[0], fileName: fileName });
    };

    return [file, inputChangeHandler];
};

export default useFile;
