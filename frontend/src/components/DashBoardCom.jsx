import { Component } from "react";
import Board from "./Board";
import DashNav from "./DashNav";
import logo from '../images/logo.svg'
import '../style/sidenav.css'
import BoardItem from './BoardItem'
import '../style/board.css'
import '../style/list.css'
import AddList from "./AddList"
import AddTask from "./AddTask";
import delete_icon_w from '../images/delete_white.svg';
import delete_icon from '../images/delete.svg';
import DeleteTask from "./DeleteTask"
import DeleteList from "./DeleteList"

import AddBoard from "./AddBoard"
import CheckButton from "./CheckButton";

export default class DashboardCom extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:null,
            boardIndex:0,
            active:false
        }
    }
    componentDidMount(){
        fetch('https://radiant-headland-93088.herokuapp.com/getcurrentuser',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token')
            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            this.setState({
                user:data.user
            })
        })
    }
    toggleSideNav(){
        if(this.state.active){
            this.setState({
                active:false
            })
        }else{
            this.setState({
                active:true
            })
        }
    }
    getClass(){
        if(this.state.active){
            return 'side_nav'
        }else{
            return 'side_nav_close'
        }
    }
    updateUser(user){
        
        this.setState({
            user:user
        })
    }
    updateBoardIndex(index){
        this.setState({
            boardIndex:index
        })

        this.toggleSideNav()
    }
    getCoverClass(){
        if(this.state.active){
            return 'cover'
        }
        else{
            return 'no'
        }
    }
    deleteBoard(){
        fetch('https://radiant-headland-93088.herokuapp.com/board_delete',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                boardIndex:this.state.boardIndex
            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            this.setState({
                user:data.user
            })

        })
    }
    deleteTask(boardIndex,listIndex,taskIndex){
        
        fetch('https://radiant-headland-93088.herokuapp.com/task_delete',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                boardIndex:boardIndex,
                listIndex:listIndex,
                taskIndex:taskIndex
            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            this.setState({
                user:data.user
            })
        })
        console.log('task deleted')
    }
    deleteList(boardIndex,listIndex){
        
        fetch('https://radiant-headland-93088.herokuapp.com/list_delete',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                boardIndex:boardIndex,
                listIndex:listIndex
            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            this.setState({
                user:data.user
            })
        })
        console.log('list deleted')
    }
    taskCompleted(boardIndex,listIndex,taskIndex){
        console.log("task completd")
        fetch('https://radiant-headland-93088.herokuapp.com/task_completed',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                boardIndex:boardIndex,
                listIndex:listIndex,
                taskIndex:taskIndex

            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            this.setState({
                user:data.user
            })    
        })
    }
    render(){
        if(this.state.user===null){
            return (
            <div className='loading'>
                <div className='loader'></div>
            </div>
            )
        }
        return (
            <div>
                <DashNav history={this.props.history} user={this.state.user}/>
                <div onClick={this.toggleSideNav.bind(this)} className='board_head'>
                    <img onClick={this.deleteBoard.bind(this)} src={delete_icon_w} alt="iocn" className='board_delete'/>
                    <p className='board_name'>Current Board : {this.state.user.boards[this.state.boardIndex].title}</p>
                </div>

                <div onClick={this.toggleSideNav.bind(this)} className={this.getCoverClass()}></div>
                <div className={this.getClass()}>
                    <div className='side_nav_head'>
                        <div className='brand_container'>
                            <img src={logo} alt="logo" className='nav_logo' />
                            <p className='nav_title'>Tasks</p>
                        </div>
                    </div>
                    <AddBoard updateUser={this.updateUser.bind(this)}/>
                    <div className='board_item_container'>
                        {this.state.user.boards.map((board)=>{
                            return <BoardItem boardIndex={this.state.user.boards.indexOf(board)} updateBoardIndex={this.updateBoardIndex.bind(this)} board={board}/>
                        })}
                    </div>
                    <p className='version'>
                        Developed By Akhlesh Soni
                        (v1.1.2)
                    </p>
                </div>


                <div className='board'>
                    <div className='lists'>
                        {this.state.user.boards[this.state.boardIndex].lists.map((list)=>{
                            return(
                                    <div className='list'>
                                        <div className='list_head'>
                                            <p className='list_title'> {list.title}</p>
                                            <DeleteList
                                                boardIndex={this.state.boardIndex} 
                                                listIndex={this.state.user.boards[this.state.boardIndex].lists.indexOf(list)} 
                                                deleteList={this.deleteList.bind(this)}/>
                                        </div>
                                        <AddTask 
                                            updateUser={this.updateUser.bind(this)} 
                                            boardIndex={this.state.boardIndex} 
                                            listIndex={this.state.user.boards[this.state.boardIndex].lists.indexOf(list)}/>
                                        <div className='tasks'>
                                            {list.tasks.map((task)=>{
                                                
                                                return (
                                                    <div className='task'>
                                                        <CheckButton
                                                            status={task.status}
                                                            boardIndex={this.state.boardIndex} 
                                                            taskIndex={list.tasks.indexOf(task)} 
                                                            listIndex={this.state.user.boards[this.state.boardIndex].lists.indexOf(list)} 
                                                            taskCompleted={this.taskCompleted.bind(this)}
                                                            />
                                                        <p className='task_title'>{task.title}</p>
                                                        <DeleteTask 
                                                            boardIndex={this.state.boardIndex} 
                                                            taskIndex={list.tasks.indexOf(task)} 
                                                            listIndex={this.state.user.boards[this.state.boardIndex].lists.indexOf(list)} 
                                                            deleteTask={this.deleteTask.bind(this)}/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        
                                    </div>
                                )
                        })}
                        <AddList updateUser={this.updateUser.bind(this)} boardIndex={this.state.boardIndex}/>
                    </div>
                </div>
            </div>
        )
    }
}