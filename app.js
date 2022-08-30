const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./Route/route');

const App = express();
const port = process.env.SERVER_PORT;

App.use(express.json());
App.use(bodyParser.json());

App.use(router);


App.listen(port, () => {
    console.log(`Connected to localhost:${port}`);
});
