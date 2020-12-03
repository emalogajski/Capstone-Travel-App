const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors()); 

app.use(express.static('website'));

const port = 3000;

const server = app.listen(port, listening);

function listening () {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};

const projectData = {};

app.post('/getdata', addData);

function addData (req, res) {
        projectData['date'] = req.body.date;
        projectData['temp'] = req.body.temp;
        projectData['content'] = req.body.content;
        res.send(projectData);
};

app.get('/all', getData)

function getData(req, res) {
    res.send(projectData);
}