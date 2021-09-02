import { Component } from "react";
import add from '../images/add.svg'
export default class AddTask extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            listIndex:props.listIndex,
            boardIndex:props.boardIndex
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            listIndex:nextProps.listIndex,
            boardIndex:nextProps.boardIndex
        });
    }

    handlechange = (e) => {
        e.preventDefault()
        this.setState({
            title:e.target.value
        })
    }
  
    handleSubmit = (event)=>{
        event.preventDefault()
        fetch('http://localhost:8000/tasks',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                title:this.state.title,
                listIndex:this.state.listIndex,
                boardIndex:this.state.boardIndex
            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            this.setState({
                title:'',
            })
            this.props.updateUser(data.user)
        })
    }
    render(){
        return (
            <div className='add_task'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text"
                        className='task_input'
                        name='title'
                        onChange={this.handlechange.bind(this)}
                        value={this.state.title} 
                        placeholder='Add New Task'/>
                    <p onClick={this.handleSubmit.bind(this)} className='add_icon'>+</p>
                </form>
            </div>
        )
    }
}