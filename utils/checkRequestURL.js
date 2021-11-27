const {validate: uuidValidate} = require("uuid");

module.exports = ({url, method}) => {
    const response = {};
    const urlParts = url.split("/").filter(el => !!el);
    const [path, id] = urlParts;
    if (path !== "person" && urlParts.length < 3) {
        response.status = 404;
        response.message = "Resource Not Found";
        return response;
    } else if (!uuidValidate(id) && urlParts.length !== 1) {
        response.status = 400;
        response.message = "ID is not valid";
        return response;
    } else if (method === "POST" && id) {
        response.status = 404;
        response.message = "Resource Not Found";
        return response;
    }
    return false;
};
