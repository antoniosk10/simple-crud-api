const db = require("./db");
const response = {status: 200, message: "OK"};
const dataIsValid = require("./utils/dataIsValid");
const {v4: uuidv4} = require("uuid");
const findPerson = require("./utils/findPerson");

const getPerson = (_, id) => {
    response.status = 200;

    if (id) {
        response.data = db.filter(item => item.id === id);
        return response;
    }

    response.data = db;
    return response;
};

const addPerson = bodyRequest => {
    if (dataIsValid(bodyRequest)) {
        const newId = uuidv4();
        const newField = {...bodyRequest, id: newId};
        db.push(newField);
        response.status = 201;
        response.data = newField;
        return response;
    }

    response.data = null;
    response.status = 400;
    response.message = "Data has wrong format!";
    return response;
};
const updatePerson = (bodyRequest, id) => {
    const person = findPerson(id);

    if (person) {
        if (dataIsValid(bodyRequest)) {
            db[person.index] = {...db[person.index], ...bodyRequest};
            response.data = db[person.index];
            return response;
        }
        response.data = null;
        response.status = 400;
        response.message = "Receive reqired fields!";
        return response;
    }

    response.data = null;
    response.status = 404;
    response.message = "ID isn't exist";
    return response;
};
const deletePerson = (_, id) => {
    const person = findPerson(id);
    response.data = null;

    if (person) {
        db.splice(person.index, 1);
        response.status = 204;
        response.message = "DELETED";
        return response;
    }

    response.status = 404;
    response.message = "ID isn't exist";
    return response;
};
module.exports = {
    GET: getPerson,
    POST: addPerson,
    PUT: updatePerson,
    DELETE: deletePerson,
};
