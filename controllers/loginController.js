const express = require('express');
const _ = require('lodash');

module.exports = users => {
    const login = (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        for (const [key, value] of users) {
            if (value.email === email) {
                if (value.password === password) {
                    res.json(value);
                } else {
                    res.status(400).send("Wrong password!");
                }
                
                return;
            } 
        }

        res.status(400).send("User does not exist!");
    }

    return {
        login,
    };
};