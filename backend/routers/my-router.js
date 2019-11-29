const userController = require('../controllers/user-controller')
const todoListController = require('../controllers/to-do-list-controller')

const express = require('express')
const router = express.Router()

// User routes -->
router.post('/postSignUp', userController.postSignUp)
router.get('/selectedUser/:id', userController.getSelectedUser)
router.post('/userAuth', userController.authenticate)
router.post('/post-editUser/:id', userController.postEditUser)
router.post('/deleteUser/:id', userController.deleteUser)
router.post('/forgotPassword', userController.forgotPassword)

router.get('/login/facebook', userController.loginFacebook)
router.get('/login/facebook/callback', userController.callbackFacebook)

router.get('/login/twitter', userController.loginTwitter)
router.get('/login/twitter/callback', userController.callbackTwitter)

router.get('/auth/google', userController.loginGoogle)
router.get('/auth/google/callback', userController.callbackGoogle)

router.get('/auth/linkedin', userController.loginLinkedin)
router.get('/auth/linkedin/callback', userController.callbackLinkedin)

// Todo list routes -->
router.post('/post-todoList/:userId', todoListController.postToDoListData)
router.get('/getAllTodolist/:userId', todoListController.getAllTodolist)
router.get('/selectedTask/:taskId', todoListController.getSelectedTask)
router.post('/postUpdatedTask/:taskId', todoListController.postUpdatedTask)
router.post('/deleteTask/:taskId', todoListController.deleteTask)
router.post('/updateStatus/:taskId', todoListController.updateStatus)
router.post('/updateTime/:taskId', todoListController.updateTime)


module.exports = router