const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getTravelData } = require('./getTravelData');
const { getTime } = require('./getTravelData');
const { getThoughts } = require('./getTravelData');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/traveldata', getTravelData);

app.get('/time', getTime);

let thoughtsArray = [];

app.post('/thoughts', (req, res) => {
  const thoughtObj = {
    thought: req.body.thought,
    timestamp: Date.now(),
    id: req.body.id,
    // Math.floor(Math.random() * 1000)
  };
  thoughtsArray.push(thoughtObj);
  res.status(200).send('All good');
});

app.get('/thoughts', (_, res) => {
  res.send(thoughtsArray);
});

app.delete('/thoughts/:id', (req, res) => {
  const reqParamsId = req.params.id;
  const found = thoughtsArray.find((item) => item.id === reqParamsId);
  if (!found) {
    res.status(400).json({ msg: `No member with the id of ${reqParamsId}` });
  } else {
    thoughtsArray = thoughtsArray.filter((item) => item.id !== reqParamsId);
    res.json(found);
  }
});

app.patch('/thoughts/:id', (req, res) => {
  const reqParamsId = req.params.id;
  const found = thoughtsArray.find((item) => item.id === reqParamsId);
  if (found && (typeof req.body.thought === 'string')) {
    thoughtsArray = thoughtsArray.map(item => item.id === reqParamsId ? {...item, thought: req.body.thought} : item);
  } else {
    res.status(400).json({ msg: `No member with the id of ${reqParamsId}` });
  }
  res.json(thoughtsArray);
});

const port = 3000;

const listening = () => {
  console.log(`running on localhost: ${port}`);
};

app.listen(port, listening);
