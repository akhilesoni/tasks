import { Component } from "react";
import check from '../images/check.svg'
export default class Task extends Component{
    constructor(props){
        super(props)
        this.state = {
            task:props.task,
            boardIndex:props.boardIndex,
            listIndex:props.listIndex,
            taskIndex:props.taskIndex
        }
    }
    getCheckClass(){
        if(this.state.task.status==='completed'){
            return 'checkbox_completed'
        }
        else{
            return 'checkbox'
        }
    }
    getIconClass(){
        if(this.state.task.status==='completed'){
            return 'check_icon_completed'
        }
        else{
            return 'check_icon'
        }
    }
   
    markcompleted(){
        fetch('http://localhost:8000/task_completed',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                boardIndex:this.state.boardIndex,
                listIndex:this.state.listIndex,
                taskIndex:this.state.taskIndex

            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            
            this.props.changeboards(data.user)

        })
    }
    render(){
        return (
            <div className='task'>
                <div onClick={this.markcompleted.bind(this)} className={this.getCheckClass()}>
                    <img src={check} alt="icon" className={this.getIconClass()}/>
                </div>
                <p className='task_title'>{this.state.task.title}</p>
                <div className='task_delete'>
                    <div className='lbar'></div>
                    <div className='rbar'></div>
                </div>
            </div>
        )
    }
}