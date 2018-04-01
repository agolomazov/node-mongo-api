const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { ObjectID } = require('mongodb');

const jsonParser = bodyParser.json();
const app = express();

app.post('/todos', jsonParser, (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({ todos });
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  }).catch(e => {
    res.status(400).send(e);
  })
}, (e) => {
  res.status(400).send(e);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  }).catch(err => {
    res.status(400).send(err);
  });
});

app.listen(3000, (err) => {
  if(!err) {
    console.log('Server running!');
  }
});

module.exports = { app };