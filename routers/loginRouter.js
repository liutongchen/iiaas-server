const express = require('express');

module.exports = users => {
    const loginController = require('../controllers/loginController')(users);

    const loginRouter = express.Router();
    loginRouter.post('/', loginController.login);

    return loginRouter;
};