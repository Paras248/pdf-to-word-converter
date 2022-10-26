const axios = require("axios");
const BigPromise = require("../utils/BigPromise");
const CustomError = require("../utils/CustomError");

const checkStatus = BigPromise((req, res, next) => {
    if (!req.query) {
        return next(new CustomError("task_id not found", 400));
    }

    const options = {
        method: "GET",
        url: `https://api.conversiontools.io/v1/tasks/${req.query.taskId}`,
        headers: {
            Authorization: process.env.API_TOKEN,
            "Content-Type": "application/json",
        },
    };

    axios
        .request(options)
        .then((response) => {
            res.status(200).json({ ...response.data });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = checkStatus;
