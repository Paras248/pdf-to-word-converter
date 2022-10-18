const express = require("express");
const Router = express.Router();

// controller imports
const uploadFile = require("../controllers/uploadFileController");
const convertFile = require("../controllers/convertFileController");
const checkStatus = require("../controllers/checkStatusController");
const downloadFile = require("../controllers/downloadFIleController");

Router.route("/file/upload").post(uploadFile);
Router.route("/file/convert").post(convertFile);
Router.route("/file/status").get(checkStatus);
Router.route("/file/download").get(downloadFile);

module.exports = Router;
