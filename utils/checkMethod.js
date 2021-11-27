const AVAILIBLE_METHODS = require("../constants/availibleMethods");

module.exports = method => {
    const response = {};
    if (AVAILIBLE_METHODS.includes(method)) {
        return false;
    }
    response.status = 400;
    response.message = "Method isn't availible";
    return response;
};
