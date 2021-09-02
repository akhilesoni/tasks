import { Component } from "react";
import '../style/list.css'
import AddTask from "./AddTask";
import Task from "./Task";
import delete_icon from '../images/delete.svg'
export default class ListComp extends Component{
    constructor(props){
        super(props)
        this.state = {
            list:null,
            listIndex:props.listIndex,
            boardIndex:props.boardIndex
        }
    }
    updatelist(list){
        this.setState({
            list:list
        })
    }
   
    deleteList(){
        fetch('http://localhost:8000/list_delete',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                boardIndex:this.state.boardIndex,
                listIndex:this.state.listIndex
            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
        })
    }
   
    render(){
        
        return (
            <div className='list'>
                
                <div className='list_head'>
                    <p className='list_title'>{this.state.list.title}</p>
                    <img onClick={this.deleteList.bind(this)} src={delete_icon} alt='icon' className='list_delete' />
                </div>
                <AddTask changeboards={this.props.changeboards} updatelist={this.updatelist.bind(this)} listIndex={this.state.listIndex} boardIndex={this.state.boardIndex}/>
                <div className='tasks'>
                    {this.state.list.tasks.map((task)=>{
                        return <Task taskIndex={this.state.list.tasks.indexOf(task)} updatelist={this.updatelist.bind(this)} listIndex={this.state.listIndex} boardIndex={this.state.boardIndex} key={this.state.list.tasks.indexOf(task)} task={task}/>
                    })}
                </div>
            </div>
        )
    }
}