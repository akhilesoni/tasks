const express = require('express');
const router = express.Router();
const googleAuth = require('./controllers/googleAuth')
const user = require('./controllers/user')

const withAuth = require('./middleware')
router.get('/',(req,res)=>{
    res.send('runnig')
})

router.post('/googlelogin',googleAuth.googlelogin)
router.post('/getcurrentuser',withAuth,user.getuser)
router.post('/boards',withAuth,user.boards)
router.post('/tasks',withAuth,user.tasks)
router.post('/lists',withAuth,user.lists)
router.post('/task_completed',withAuth,user.taskCompleted)
router.post('/board_delete',withAuth,user.boardDelete)
router.post('/list_delete',withAuth,user.listDelete)
router.post('/task_delete',withAuth,user.taskDelete)

router.post('/checkToken', withAuth,(req,res)=>{
    res.sendStatus(200)
})

module.exports = router