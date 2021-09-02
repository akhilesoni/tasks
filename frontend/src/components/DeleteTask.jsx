import { Component } from "react";
import delete_icon from '../images/delete.svg';
import '../style/list.css'

export default class DeleteTask extends Component{
    constructor(props){
        super(props)
        this.state = {
            boardIndex:props.boardIndex,
            listIndex:props.listIndex,
            taskIndex:props.taskIndex
        }
    }
    deleteTask(){
        this.props.deleteTask(this.state.boardIndex,this.state.listIndex,this.state.taskIndex)
    }

    render(){
        return(
            <div>
                <img src={delete_icon} alt="icon" className='task_delete' onClick={this.deleteTask.bind(this)}/>
            </div>
        )
    }
}