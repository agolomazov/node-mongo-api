const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const jsonParser = bodyParser.json();
const app = express();

app.post('/todos', jsonParser, (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(201).send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});


app.listen(3000, (err) => {
  if(!err) {
    console.log('Server running!');
  }
});