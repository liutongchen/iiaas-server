// global imports
var _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const users = new Map();
const userRouter = require('./routers/userRouter.js')(users);
const loginRouter = require('./routers/loginRouter.js')(users);

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.listen(port, () => {
    console.log(`IIaaS is running on port ${port}.`);
});
