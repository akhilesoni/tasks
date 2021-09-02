import { Component } from "react";
import icon from '../images/board_icon.svg'
import '../style/sidenav.css'
export default class BoardItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            board:props.board,
            boardIndex:props.boardIndex
        }
    }
    updateBoard(){
        this.props.updateBoardIndex(this.state.boardIndex)
    }
 
    render(){
        return (
            <div onClick={this.updateBoard.bind(this)} className='board_item'>
                <img src={icon} alt="icon" className='item_icon'/>
                <p className='item_text'> {this.state.board.title}</p>
            </div>
        )
    }
}