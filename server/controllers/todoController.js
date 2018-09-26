const Todo = require('../models/todo')
const User = require('../models/user')

module.exports = {
    createTodo: (req, res) => {
        console.log(req.body.title);
        
        Todo
            .create({
                title: req.body.title
            })
            .then(todo => {
                res.status(201).json({
                    msg: `Create Todo Success`,
                    data: todo
                })
            })
            .catch(err => {
                res.status(404).json(err.message)
            })
    },
    showAllTodos: (req, res) => {
        Todo
            .find()
            .populate('userId', 'name')
            .then(todos => {
                res.status(200).json({
                    msg: `Display All Todos Success`,
                    data: todos
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    showUserTodos: (req, res) => {
        Todo
            .find({
                userId: req.params.id
            })
            // .populate('userId', 'name')
            .then(todos => {
                res.status(200).json({
                    msg: `Display User Todos Success`,
                    data: todos
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    updateTodo: (req, res) => {
        Todo
            .findOneAndUpdate({
                _id : req.params.id
            }, {
                $set : {
                    status : true
                }
            })
            .then(() => {
                Todo
                    .find()
                    .populate('userId', 'name')
                    .then(todos => {
                        res.status(200).json({
                            data: todos
                        })
                    })
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}