const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../schema/todos');

router.get('/', (req, res, next) => {
  Todo.find()
  .select('title description ps isDone _id')
  .exec()
  .then(docs => {
    res.status(200).json({
      msg: 'Success Get All TodoList',
      docs,
    });
  })
  .catch(err => {
    res.status(500).json({
      msg: err,
    });
  });
});

router.post('/', (req, res, next) => {
  
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone || false,
    ps: req.body.ps || '',
  });

  todo.save()
  .then(result => {
    res.status(201).json({
      msg: 'Success Create TodoList',
      title: result.title,
      description: result.description,
      isDone: result.isDone,
      ps: result.ps,
      _id: result._id,
    });
  })
  .catch(err => {
    res.status(500).json({
      msg: err,
    });
  });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Todo.findById(id)
    .select('title description isDone ps _id')
    .exec()
    .then(doc => {
      if(doc){
        res.status(200).json({
          msg: `'Success Get ${id} TodoList'`,
          doc,
        });
      }else {
        res.status(404).json({
          msg: 'No Data',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: err,
      });
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Todo.remove({
    _id: id
  })
  .exec()
  .then(result => {
    res.status(200).json({
      msg: 'Success Delete TodoList',
      result,
    });
  })
  .catch(err => {
    res.status(500).json({
      msg: err,
    });
  });
});

router.patch('/:id', (req, res, next) => {

  const id = req.params.id;

  const updateTodo = req.body;

  Todo.update({
      _id: id 
  }, {
    $set: {...updateTodo}
  })
  .exec()
  .then(result => {
    res.status(200).json({
      msg: 'Success Update TodoList',
      result,
    });
  })
  .catch(err => {
    res.status(500).json({
      msg: err,
    });
  });
});

module.exports = router;