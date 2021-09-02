import { Component } from "react";
import add from '../images/add.svg'

export default class AddList extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            boardIndex:props.boardIndex
        }
    }

    componentWillReceiveProps(props){
        this.setState(props)
    }
    handlechange = (e) => {
        e.preventDefault()
        this.setState({
            title:e.target.value
        })
    }
  
    handleSubmit = (e) =>{
        e.preventDefault()
        if(this.state.title==""){
            return
        }
        console.log("addlist"+this.state.boardIndex)
        fetch('http://localhost:8000/lists',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                title:this.state.title,
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
        return(
            <div className='add_list'>
                 <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text"
                        className='task_input'
                        name='title'
                        onChange={this.handlechange.bind(this)}
                        value={this.state.title} 
                        placeholder='Add New List'/>
                    <p onClick={this.handleSubmit.bind(this)} className='add_icon' >+</p>
                </form>
            </div>
        )
    }
}