const dataIsArrayOfStrings = require("./dataIsArrayOfStrings");

module.exports = data =>
    data.name &&
    typeof data.name === "string" &&
    data.age &&
    typeof data.age === "number" &&
    dataIsArrayOfStrings(data.hobbies);
