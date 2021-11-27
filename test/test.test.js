const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);

describe("test CRUD scenarios #1", () => {
    let tempID;
    test("'GET /person' expect []", done => {
        request.get("/person").then(res => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
            done();
        });
    });
    test("'POST /person' expect recived person", done => {
        const expectedObj = {name: "Ivan", age: 23, hobbies: ["football"]};
        request
            .post("/person")
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                tempID = res.body.id;
                expect(res.status).toBe(201);
                expect(res.body).toMatchObject(expectedObj);
                done();
            });
    });

    test("'GET /person/{personId}' expect person by recived ID", done => {
        const expectedObj = [
            {
                id: tempID,
                name: "Ivan",
                age: 23,
                hobbies: ["football"],
            },
        ];
        request.get(`/person/${tempID}`).then(res => {
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(expectedObj);
            done();
        });
    });

    test("'PUT /person/{personId}' expect changed person", done => {
        const expectedObj = {name: "Anton", age: 50, hobbies: ["sleep", "eat"]};
        request
            .put(`/person/${tempID}`)
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body).toMatchObject(expectedObj);
                done();
            });
    });

    test("'DELETE /person/{personId}' expect status 204", done => {
        request.delete(`/person/${tempID}`).then(res => {
            expect(res.status).toBe(204);
            done();
        });
    });

    test("'GET /person/{personId}' expect message 'ID isn't exist'", done => {
        request.get(`/person/${tempID}`).then(res => {
            expect(res.status).toBe(404);
            expect(res.body).toEqual("ID isn't exist");
            done();
        });
    });
});

describe("test CRUD scenarios #2", () => {
    let tempID;
    test("'POST /person' expect recived person", done => {
        const expectedObj = {name: "Ivan", age: 23, hobbies: ["football"]};
        request
            .post("/person")
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                tempID = res.body.id;
                expect(res.status).toBe(201);
                expect(res.body).toMatchObject(expectedObj);
                done();
            });
    });

    test("'PATCH /person/{personId}' expect 'Method isn't availible'", done => {
        const expectedObj = {name: "Ivan", age: 23, hobbies: ["football"]};
        request
            .patch(`/person/${tempID}`)
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body).toEqual("Method isn't availible");
                done();
            });
    });

    test("'COPY /person/{personId}' expect 'Method isn't availible'", done => {
        const expectedObj = {name: "Ivan", age: 23, hobbies: ["football"]};
        request
            .copy(`/person/${tempID}`)
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body).toEqual("Method isn't availible");
                done();
            });
    });

    test("'GET /person/{notValidId}' expect message 'ID is not valid'", done => {
        request.get(`/person/234456`).then(res => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual("ID is not valid");
            done();
        });
    });
});

describe("test CRUD scenarios #3", () => {
    let tempID;
    test("'GET /people' expect message 'Resource Not Found'", done => {
        request.get(`/people`).then(res => {
            expect(res.status).toBe(404);
            expect(res.body).toEqual("Resource Not Found");
            done();
        });
    });
    test("'POST /person' expect recived person", done => {
        const expectedObj = {name: "Ivan", age: 23, hobbies: ["football"]};
        request
            .post("/person")
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                tempID = res.body.id;
                expect(res.status).toBe(201);
                expect(res.body).toMatchObject(expectedObj);
                done();
            });
    });
    test("'POST /person/{personId}' expect 'Resource Not Found'", done => {
        const expectedObj = {name: "Ivan", age: 23, hobbies: ["football"]};
        request
            .post(`/person/${tempID}`)
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                expect(res.status).toBe(404);
                expect(res.body).toEqual("Resource Not Found");
                done();
            });
    });

    test("'POST /person/' without requiered field expect 'Data has wrong format!'", done => {
        const expectedObj = {name: "Ivan", hobbies: ["football"]};
        request
            .post("/person")
            .send(expectedObj)
            .set("Accept", "application/json")
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body).toEqual("Data has wrong format!");
                done();
            });
    });
});
