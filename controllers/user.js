const User = require('../models/user')

const getuser = (req,res)=>{
    const email = req.email

    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{
            res.json({user:user})
        }
    })
}
const boards = (req,res)=>{
    const email = req.email
    const {title} = req.body

    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{
            user.boards.push({title:title,lists:[]})
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.json({user:user})
                }
            })
        }
    })
}
const lists = (req,res)=>{
    const email = req.email
    const boardIndex = parseInt(req.body.boardIndex)
    const title = req.body.title
    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{

            user.boards[boardIndex].lists.push({title:title,tasks:[]})
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.json({user:user})
                }
            })
        }
    })
}

const tasks = (req,res)=>{
    const email = req.email
    const listIndex = parseInt(req.body.listIndex)
    const boardIndex = parseInt(req.body.boardIndex)
    const title = req.body.title
    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{
            
            user.boards[boardIndex].lists[listIndex].tasks.push({title:title,status:'incompleted'})
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.json({user:user})
                }
            })
        }
    })
}
const taskCompleted = (req,res)=>{
    const email = req.email
    const listIndex = parseInt(req.body.listIndex)
    const boardIndex = parseInt(req.body.boardIndex)
    const taskIndex = parseInt(req.body.taskIndex)

    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{
            console.log(user.boards[boardIndex].lists)

            user.boards[boardIndex].lists[listIndex].tasks[taskIndex].status = 'completed'
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.json({user:user})
                }
            })
        }
    })
}
const listDelete = (req,res)=>{
    const email = req.email
    const boardIndex = parseInt(req.body.boardIndex)
    const listIndex = parseInt(req.body.listIndex)


    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{
            user.boards[boardIndex].lists[listIndex].remove()
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.json({user:user})
                }
            })
        }
    })
}
const boardDelete = (req,res)=>{
    const email = req.email
    const boardIndex = parseInt(req.body.boardIndex)
   


    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{
            user.boards[boardIndex].remove()
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.json({user:user})
                }
            })
        }
    })
}

const taskDelete = (req,res)=>{
    const email = req.email
    const boardIndex = parseInt(req.body.boardIndex)
    const listIndex = parseInt(req.body.listIndex)
    const taskIndex = parseInt(req.body.taskIndex)


    User.findOne({email:email},(err,user)=>{
        if(err){
            throw err
        }
        else{
            user.boards[boardIndex].lists[listIndex].tasks[taskIndex].remove()
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.json({user:user})
                }
            })
        }
    })
}
module.exports = {
    getuser,
    boards,
    tasks,
    lists,
    taskCompleted,
    listDelete,
    taskDelete,
    boardDelete
}