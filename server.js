require("dotenv").config();
const http = require("http");
const getResponse = require("./utils/getResponse");
const {PORT} = process.env;
const endRequest = require("./utils/endRequest");

const server = http.createServer((req, res) => {
    let body = [];
    res.setHeader("Content-Type", "application/json");

    req.on("error", err => {
        endRequest(res, {status: 500, message: "Something went wrong"});
    })
        .on("data", chunk => {
            body.push(chunk);
        })
        .on("end", () => {
            try {
                body = body.length ? JSON.parse(body) : body;
                const responseData = getResponse(req, body);
                endRequest(res, responseData);
            } catch {
                endRequest(res, {status: 500, message: "Something went wrong"});
            }
        });
});

server.listen(PORT, "localhost", error => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
