const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();


userRouter.use('/', userController.parseFields);

userRouter.route('/')
    .post(userController.postUser)
    .get(userController.getUsers);

userRouter.use(
    '/:id', 
    userController.findUser,
    userController.verifyApiKey);

userRouter.route('/:id')
    .get(userController.getUser)
    .patch(userController.patchUser)
    .delete(userController.deleteUser);

module.exports = userRouter;