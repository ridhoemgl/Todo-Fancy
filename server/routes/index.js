const router = require('express').Router()
const { signup, signin, showAllUsers } = require('../controllers/userController')
const { createTodo, showAllTodos, showUserTodos, updateTodo } = require('../controllers/todoController')

// User
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/display', showAllUsers)

// Todo
router.post('/create/todo', createTodo)
router.get('/display/todo', showAllTodos)
router.post('/display/todo/:id', showUserTodos)
router.put('/update/:id', updateTodo)

module.exports = router