import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import FileInput from "./components/FileInput";
import DescriptionIcon from "@mui/icons-material/Description";
import ConvertButton from "./components/ConvertButton";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";
import DownloadButton from "./components/DownloadButton";
import DownloadIcon from "@mui/icons-material/Download";

function App() {
    const [file, setFile] = useState({
        file: null,
        fileName: "",
    });

    const [uploadResponse, setUploadResponse] = useState({
        fileId: "",
        uploadSuccess: false,
    });

    const [convertResponse, setConvertResponse] = useState({
        taskId: "",
        convertSuccess: false,
    });

    const [checkStatusResponse, setCheckStatusResponse] = useState({
        fileId: "",
        statusSuccess: false,
    });

    const [downloadResponse, setDownloadResponse] = useState({
        fileName: "",
        downloadSuccess: false,
    });

    const [isFileReady, setIsFileReady] = useState(false);
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        // if upload was success then execute this
        // the below code is to convert the uploaded file
        if (uploadResponse.uploadSuccess) {
            const convertOptions = {
                method: "POST",
                url: `http://localhost:4000/api/file/convert?fileId=${uploadResponse.fileId}`,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            console.log("converting...");
            axios
                .request(convertOptions)
                .then((response) => {
                    setConvertResponse({
                        taskId: response.data.task_id,
                        convertSuccess: true,
                    });
                })
                .catch((err) => console.log(err));
        }
    }, [uploadResponse]);

    useEffect(() => {
        // below code is to check conversion status
        // if upload is success and convert is success then execute the below code
        if (convertResponse.convertSuccess) {
            console.log("checking status...");
            const statusOptions = {
                method: "GET",
                url: `http://localhost:4000/api/file/status?taskId=${convertResponse.taskId}`,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let setIntervalId = setInterval(() => {
                axios
                    .request(statusOptions)
                    .then((response) => {
                        if (
                            response.data.status === "SUCCESS" ||
                            response.data.status === "ERROR"
                        ) {
                            if (response.data.status === "SUCCESS") {
                                setCheckStatusResponse({
                                    fileId: response.data.file_id,
                                    statusSuccess: true,
                                });
                            }
                            clearInterval(setIntervalId);
                        }
                    })
                    .catch((err) => {
                        clearInterval(setIntervalId);
                        console.log(err);
                    });
            }, 5000);
        }
    }, [convertResponse]);

    useEffect(() => {
        // below code is to download the file on server
        // if check file status was success then

        if (checkStatusResponse.statusSuccess) {
            const downloadOptions = {
                method: "GET",
                url: `http://localhost:4000/api/file/download?fileId=${checkStatusResponse.fileId}`,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            console.log("donwloading file on server...");
            axios
                .request(downloadOptions)
                .then((response) => {
                    console.log(response);
                    setDownloadResponse({
                        fileName: response.data.fileName,
                        downloadSuccess: true,
                    });
                })
                .catch((err) => console.log(err));
        }
    }, [checkStatusResponse]);

    useEffect(() => {
        // below code is to upload on cloudinary
        if (downloadResponse.downloadSuccess) {
            const cloudinaryUploadOptions = {
                method: "GET",
                url: `http://localhost:4000/api/file/cloud/upload?fileName=${downloadResponse.fileName}`,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            console.log("uploading file on cloudinary...");
            axios
                .request(cloudinaryUploadOptions)
                .then((response) => {
                    console.log(" cloudinary upload ...");

                    setFileUrl(`${response.data.file_url}`);
                    setIsFileReady(true);
                    return;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [downloadResponse]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log("uploading file...");
        if (!uploadResponse.uploadSuccess) {
            const formData = new FormData();
            formData.append("file", file.body);

            const uploadOptions = {
                method: "POST",
                url: "http://localhost:4000/api/file/upload",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            };

            // requesting to upload the file
            axios
                .request(uploadOptions)
                .then((response) => {
                    console.log("file uploaded...");
                    setUploadResponse({
                        fileId: response.data.file_id,
                        uploadSuccess: true,
                    });
                })
                .catch((err) => console.log(err));
        }
    };

    const inputChangeHandler = (e) => {
        let fileName = e.target.files["0"].name;
        fileName = fileName.split(".")[0];
        if (fileName.length >= 23) {
            fileName = `${fileName.substr(0, 17)}..`;
        }
        setFile({ body: e.target.files[0], fileName: fileName });
    };

    return (
        <div className={styles.container}>
            <div className={styles["file-main-container"]}>
                <form onSubmit={formSubmitHandler} encType="multipart/form-data">
                    <div className={styles["file-sub-container"]}>
                        {file.fileName === "" &&
                            !isFileReady && [
                                <p key={0} className={styles["select-heading"]}>
                                    Select{" "}
                                    <DescriptionIcon className={styles["file-icon"]} /> to
                                    convert
                                </p>,
                                <FileInput
                                    key={1}
                                    inputChangeHandler={inputChangeHandler}
                                />,
                                <p key={2} className={styles["file-name"]}>
                                    No file selected
                                </p>,
                            ]}
                        {file.fileName !== "" &&
                            !isFileReady && [
                                <p key={0} className={styles["select-heading"]}>
                                    To start the
                                    <AutoFixHighIcon
                                        className={styles["file-icon"]}
                                        style={{ marginLeft: 7, marginRight: 7 }}
                                    />
                                    Hit
                                </p>,
                                <ConvertButton key={1} />,
                                <p
                                    key={2}
                                    className={styles["file-name"]}
                                >{`${file.fileName}.pdf`}</p>,
                            ]}
                        {file.fileName !== "" &&
                            isFileReady && [
                                <p
                                    key={0}
                                    className={styles["select-heading"]}
                                    style={{ marginLeft: -10 }}
                                >
                                    Your
                                    <DescriptionIcon className={styles["file-icon"]} />
                                    is ready to{" "}
                                    <DownloadIcon style={{ marginLeft: 5.3 }} />
                                </p>,
                                <DownloadButton key={1} fileUrl={fileUrl} />,
                            ]}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
