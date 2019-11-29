const TodoList = require('../models/to-do-list')
require('../models/users')
require('./user-controller')

exports.postToDoListData = (req, res, next) => {
    var user_id = req.params.userId
    var completionTime = req.body.completionTime
    var timeType = req.body.timeType
    if(timeType =="hours"){
        var hours = completionTime
        var minutes = 0
        var seconds = 0
    }
    else if(timeType == "minutes"){
        var hours = 0
        var minutes = completionTime
        var seconds = 0
    }
    else {
        var hours = 24*completionTime
        var minutes = 0
        var seconds = 0
    }
    var todo_list = TodoList({
        userId: user_id,
        taskName: req.body.taskName,
        taskNote: req.body.taskNote,
        priority: req.body.priority,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    })
    return todo_list.save().then(doc => {
        res.status(200).json({
            success: true,
            message: 'todo-list inserted successfully!!!',
            data: doc
        })
    }).catch(err => {
        console.log('Error in insertion of todo-list: ' + err)
    })
}

exports.getAllTodolist = (req, res, next) => {
    var user_id = req.params.userId
    return TodoList.find({ userId: user_id }).then((doc) => {
        res.status(200).json({
            success: true,
            message: 'All todo list is here!',
            data: doc
        })
    }).catch(err => {
        console.log('Error in fetching todo list: ' + err)
    })
}

exports.getSelectedTask = (req, res, next) => {
    var task_id = req.params.taskId
    return TodoList.findOne({ _id: task_id }).then((doc) => {
        res.status(200).json({
            success: true,
            message: 'Selected task is here!',
            data: doc
        })
    }).catch(err => {
        console.log('Error in fetching selected task: ' + err)
    })
}

exports.postUpdatedTask = async (req, res, next) => {
    var task_id = req.params.taskId
    var completionTime = req.body.completionTime
    var timeType = req.body.timeType
    if(timeType =="hours"){
        var hours = completionTime
        var minutes = 0
        var seconds = 0
    }
    else if(timeType == "minutes"){
        var hours = 0
        var minutes = completionTime
        var seconds = 0
    }
    else {
        var hours = 24*completionTime
        var minutes = 0
        var seconds = 0
    }
    var updatedTask = await TodoList.findOne({ _id: task_id })
    updatedTask.taskName = req.body.taskName
    updatedTask.taskNote = req.body.taskNote
    updatedTask.priority = req.body.priority
    updatedTask.hours = hours
    updatedTask.minutes = minutes
    updatedTask.seconds = seconds
    if(updatedTask.status == "Ended" || updatedTask.status == "Activated" || updatedTask.status == "Paused"){
        updatedTask.status = "Not Activated"
    }
    else{
        updatedTask.status = updatedTask.status
    }
    return updatedTask.save().then(doc => {
        res.status(200).json({
            success: true,
            message: 'Task updated successfully!',
            data: doc
        })
    }).catch(err => {
        console.log('Error in updation: ' + err)
    })
}

exports.deleteTask = (req, res, next) => {
    var task_id = req.params.taskId
    return TodoList.findOneAndDelete({ _id: task_id }).then((doc) => {
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully!',
            data: doc
        })
    }).catch(err => {
        console.log('Error in deletion: ' + err)
    })
}


exports.updateStatus = async (req, res, next) => {
    var task_id = req.params.taskId
    var task = await TodoList.findOne({ _id: task_id })
    task.status = req.body.taskStatus
    task.save().then(doc=>{
        res.status(200).json({
            success: true,
            message: 'Selected task is Activated!',
            data: doc
        })        
    }).catch(err => {
        console.log('Error in fetching selected task: ' + err)
    })
}

exports.updateTime = async (req, res, next) => {
    var task_id = req.params.taskId
    var task = await TodoList.findOne({ _id: task_id })
    task.hours = req.body.hours
    task.minutes =  req.body.minutes
    task.seconds = req.body.seconds
    task.save().then(doc=>{
        res.status(200).json({
            success: true,
            message: 'Selected task is Activated!',
            data: doc
        })        
    }).catch(err => {
        console.log('Error in fetching selected task: ' + err)
    })
}