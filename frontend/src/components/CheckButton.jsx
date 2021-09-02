import { Component } from "react";

export default class CheckButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            boardIndex:props.boardIndex,
            listIndex:props.listIndex,
            taskIndex:props.taskIndex,
            status:props.status
        }
    }
    getClass(){
        if(this.state.status==="incompleted"){
            return 'checkbox'
        }else{
            return 'checkbox_completed'
        }
    }

    taskCompleted(){
        this.setState({
            status:'completed'
        })
        this.props.taskCompleted(this.state.boardIndex,this.state.listIndex,this.state.taskIndex)
    }
    render(){
        return (
            <div onClick={this.taskCompleted.bind(this)} className={this.getClass()}>
                <div className='right'></div>
            </div>
        )
    }
}