module.exports = (res, {status, data, message}) => {
    res.statusCode = status;
    if (data) {
        res.end(JSON.stringify(data));
    } else {
        res.end(message);
    }
};
