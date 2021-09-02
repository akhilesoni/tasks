import { Component } from "react";
import logo from '../images/logo.svg'
import '../style/sidenav.css'
import BoardItem from './BoardItem'
export default class SideNavBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            active:true,
            boards:props.boards
        }
    }
    getClass(){
        if(this.state.active){
            return 'side_nav'
        }else{
            return 'side_nav_close'
        }
    }
    updateBoardIndex(board){
        this.props.updateBoardIndex(this.state.boards.indexOf(board))
    }
    render(){
        return (
            <div className={this.getClass()}>
                <div className='side_nav_head'>
                    <div className='brand_container'>
                        <img src={logo} alt="logo" className='nav_logo' />
                        <p className='nav_title'>Tasks</p>
                    </div>
                </div>

                <div>
                    {this.state.boards.map((board)=>{
                        return <BoardItem updateBoardIndex={this.updateBoardIndex.bind(this)} board={board}/>
                    })}
                </div>
            </div>
        )
    }
}