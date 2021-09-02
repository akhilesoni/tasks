import { Component } from "react";
import logo from '../images/logo.svg'

export default class DashNav extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:props.user
        }
    }
    render(){
        return (
            <div className='navbar'>
                <div className='brand_container'>
                    <img src={logo} alt="logo" className='nav_logo' />
                    <p className='nav_title'>Tasks</p>
                </div>
                <div className='dash_right_container'>
                    <img src={this.state.user.photo} alt="profile" className='nav_profile'/>
                </div>
            </div>
        )
    }
}