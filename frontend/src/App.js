import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import FileInput from "./components/processFile/FileInput";
import DescriptionIcon from "@mui/icons-material/Description";
import ConvertButton from "./components/processFile/ConvertButton";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";
import DownloadButton from "./components/processFile/DownloadButton";
import DownloadIcon from "@mui/icons-material/Download";
import Backdrop from "./components/UI/Backdrop";

function App() {
    const [file, setFile] = useState({
        file: null,
        fileName: "",
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [isFileReady, setIsFileReady] = useState(false);
    const [fileUrl, setFileUrl] = useState("");

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log("uploading file...");

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
                console.log(response.data);
                const convertOptions = {
                    method: "POST",
                    url: `http://localhost:4000/api/file/convert?fileId=${response.data.file_id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                axios
                    .request(convertOptions)
                    .then((response) => {
                        console.log(response.data);
                        const statusOptions = {
                            method: "GET",
                            url: `http://localhost:4000/api/file/status?taskId=${response.data.task_id}`,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };

                        axios
                            .request(statusOptions)
                            .then((response) => {
                                console.log(response.data);
                                const downloadOptions = {
                                    method: "GET",
                                    url: `http://localhost:4000/api/file/download?fileId=${response.data.file_id}`,
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                };
                                axios
                                    .request(downloadOptions)
                                    .then((response) => {
                                        setTimeout(() => {
                                            console.log(response.data);
                                            const cloudinaryUploadOptions = {
                                                method: "get",
                                                url: `http://localhost:4000/api/file/cloud/upload?fileName=${response.data.fileName}`,
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                            };
                                            console.log(
                                                "uploading file on cloudinary..."
                                            );
                                            axios
                                                .request(cloudinaryUploadOptions)
                                                .then((response) => {
                                                    console.log(response.data);
                                                    setFileUrl(response.data.file_url);
                                                    setIsFileReady(true);

                                                    //check the behaviour afterwards
                                                    setShowLoadingModal(false);
                                                    setShowSuccessModal(true);
                                                })
                                                .catch((err) => {
                                                    setShowLoadingModal(false);
                                                    setShowErrorModal(true);
                                                    console.log(err);
                                                });
                                        }, 1000);
                                    })
                                    .catch((err) => {
                                        setShowErrorModal(true);
                                        console.log(err);
                                    });
                            })
                            .catch((err) => {
                                setShowLoadingModal(false);
                                setShowErrorModal(true);
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        setShowLoadingModal(false);
                        setShowErrorModal(true);
                        console.log(err);
                    });
            })
            .catch((err) => {
                setShowLoadingModal(false);
                setShowErrorModal(true);
                console.log(err);
            });
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
        <>
            <header>
                <div className={styles["header-text-container"]}>
                    <p className={styles["header-text"]}>Pdf-To-Word</p>
                </div>
            </header>
            {showSuccessModal && (
                <Backdrop success setShowSuccessModal={setShowSuccessModal} />
            )}
            {showLoadingModal && <Backdrop loading />}
            {showErrorModal && <Backdrop error setShowErrorModal={setShowErrorModal} />}
            <div className={styles.container}>
                <div className={styles["file-main-container"]}>
                    <form onSubmit={formSubmitHandler} encType="multipart/form-data">
                        <div className={styles["file-sub-container"]}>
                            {file.fileName === "" &&
                                !isFileReady && [
                                    <p key={0} className={styles["select-heading"]}>
                                        Select{" "}
                                        <DescriptionIcon
                                            className={styles["file-icon"]}
                                        />{" "}
                                        to convert
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
                                    <ConvertButton
                                        key={1}
                                        setShowLoadingModal={setShowLoadingModal}
                                    />,
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
                                        <DescriptionIcon
                                            className={styles["file-icon"]}
                                        />
                                        is ready to{" "}
                                        <DownloadIcon style={{ marginLeft: 5.3 }} />
                                    </p>,
                                    <DownloadButton key={1} fileUrl={fileUrl} />,
                                ]}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default App;
