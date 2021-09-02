import { Component } from "react";
import add from '../images/add.svg'
import '../style/board.css'
export default class AddBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:''
        }
    }
    handlechange = (e) => {
        e.preventDefault()
        this.setState({
            title:e.target.value
        })
    }
  
    handleSubmit = (event)=>{
        event.preventDefault()
        fetch('http://localhost:8000/boards',{
            method: 'POST',
            body: JSON.stringify({
                token:localStorage.getItem('token'),
                title:this.state.title
            }),
            headers: {
              'Content-Type': 'application/json'
            }            
        }).then(res=>res.json()).then((data)=>{
            this.setState({
                title:'',
                user:data.user
            })

            this.props.updateUser(data.user)


        })
    }
 
    render(){
        return (
            <div className='add_board'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text"
                            className='board_input'
                            name='title'
                            placeholder='Add New Board'
                            value={this.state.title} 
                            onChange={this.handlechange.bind(this)}/>
                    <p className='add_icon' onClick={this.handleSubmit.bind(this)}>+</p>
                </form>
            </div>
        )
    }
}