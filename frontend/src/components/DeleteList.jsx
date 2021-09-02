import { Component } from "react";
import delete_icon from '../images/delete.svg';
import '../style/list.css'

export default class DeleteList extends Component{
    constructor(props){
        super(props)
        this.state = {
            boardIndex:props.boardIndex,
            listIndex:props.listIndex
        }
    }
    deleteList(){
        this.props.deleteList(this.state.boardIndex,this.state.listIndex)
    }

    render(){
        return(
        
            <img src={delete_icon} alt="icon" className='list_delete' onClick={this.deleteList.bind(this)}/>
        )
    }
}