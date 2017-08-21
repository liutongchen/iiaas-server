const express = require('express');
const _ = require('lodash');

const userRouter = express.Router();


const generateUserId = (() => {
    let nextId = 0;
    return () => (nextId++).toString();
})();

const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

const users = new Map();

const createNewRecord = data => ({
    "id": generateUserId(),
    "type": "user",
    "email": data.email,
    "password": data.password,
    "apiKey": guid(),
    "currentNumber": 0,
});

// Request handlers

const postUser = (req, res) => {
    const newUser = createNewRecord(req.body);
    users.set(newUser.id, newUser);
    res.status(201).send(newUser);
};

const getUsers = (req, res) => {
    const allUsers = [...users.values()];

    const result = req.fields ? _.map(allUsers, user => _.pick(user, req.fields)) : allUsers;

    res.json(result);
};

const getUser = (req, res) => {

    const result = req.fields ? _.pick(req.user, req.fields) : req.user;

    res.json(result);
};

const patchUser = (req, res) => {
    const writableFields = ["email", "password"];

    _.forEach(req.body, key => {
        if (_.includes(writableFields, key)) {
            req.user[key] = req.body[key];
        }
    });

    if (_.toUpper(req.body.currentNumber) === "INC") {
        ++req.user.currentNumber;
    } else if (_.isInteger(req.body.currentNumber) && req.body.currentNumber >= 0) {
        req.user.currentNumber = req.body;
    } else if (req != null) {
        res.status(400).send("Invalid currentNumber. It has to be non-negative integer.");
        return ;
    }

    const result = req.fields ? _.pick(req.user, req.fields) : req.user;
    res.json(result);
};

const deleteUser = (req, res) => {
    users.delete(req.user.id);

    res.send("Deleted");
}

// Middlewares

const parseFields = (req, res, next) => {
    if (req.query.fields) {
        req.fields = _.map(req.query.fields.split(','), field => field.trim());
    }

    next();
};

const findUser = (req, res, next) => {
    const id = req.params.id;
    const user = users.get(id);

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(404).send("User does not exist!");
    }
};

const verifyApiKey = (req, res, next) => {
    const id = req.params.id;
    const apiKey = req.get('apiKey');

    if (users.get(id).apiKey === apiKey) {
        next();
    } else {
        res.status(401).send("You don't have access to this resource.");
    }
};

module.exports = {
    getUsers,
    postUser,
    patchUser,
    deleteUser,
    getUser,
    parseFields,
    findUser,
    verifyApiKey,
};