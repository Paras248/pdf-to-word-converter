const axios = require("axios");
const BigPromise = require("../utils/BigPromise");
const CustomError = require("../utils/CustomError");

const downloadFile = BigPromise((req, res, next) => {
    if (!req.query) {
        return next(new CustomError("no fileId found in url", 400));
    }

    const options = {
        method: "GET",
        url: `https://api.conversiontools.io/v1/files/${req.query.fileId}`,
        headers: {
            Authorization: process.env.API_TOKEN,
            "Content-Type": "application/json",
        },
    };

    // task - to download the file
    axios
        .request(options)
        .then((response) => {
            console.log(response);
            res.status(200).send(response.data);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = downloadFile;
