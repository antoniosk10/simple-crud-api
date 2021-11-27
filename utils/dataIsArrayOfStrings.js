module.exports = array =>
    Array.isArray(array) && array.every(el => typeof el === "string");
