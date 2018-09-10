const Todo = require('../models/todo')
const User = require('../models/user')

module.exports = {
    createTodo: (req, res) => {
        User
            .findById(req.params.id)
            .then(user => {
                if(user){
                    console.log(req.body);
                    console.log(`User Found`);
                    Todo
                        .create({
                            userId: req.params.id,
                            name: req.body.name,
                            description: req.body.description
                        })
                        .then(todo => {
                            res.status(201).json({
                                msg: `Create Todo Success`,
                                data: todo
                            })
                        })
                }
            })
            .catch(err => {
                res.status(404).json({
                    msg: 'User Id Not Found'
                })
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
    }
}