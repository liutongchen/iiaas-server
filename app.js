// global imports
var _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routers/userRouter.js');

app.use(bodyParser.json());

app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`IIaaS is running on port ${port}.`);
});
