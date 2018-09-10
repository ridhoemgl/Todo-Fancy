const router = require('express').Router()
const { fbLogin, signup, signin, createUser, showAllUsers } = require('../controllers/userController')
const { createTodo, showAllTodos, showUserTodos } = require('../controllers/todoController')

// User
router.post('/fb-login', fbLogin)
router.post('/signup', createUser)
router.post('/signin', signin)
router.get('/display', showAllUsers)

// Todo
router.post('/create/todo/:id', createTodo)
router.get('/display/todo', showAllTodos)
router.post('/display/todo/:id', showUserTodos)

module.exports = router