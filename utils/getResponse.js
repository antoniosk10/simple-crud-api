const checkRequestURL = require("./checkRequestURL");
const controller = require("../controller");
const checkMethod = require("./checkMethod");

module.exports = (req, body) => {
    const id = req.url.split("/").filter(el => !!el)[1];

    return (
        checkMethod(req.method) ||
        checkRequestURL(req) ||
        controller[req.method](body, id)
    );
};
