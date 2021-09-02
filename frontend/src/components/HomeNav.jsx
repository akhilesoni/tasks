import { Component } from "react";
import logo from '../images/logo.svg'
import '../style/nav.css'
import GoogleSignIn from "./GoogleSignIn";
export default class HomeNav extends Component{
    constructor(props){
        super(props)
    }
 

    
    render(){
        return (
            <div className='navbar'>
                <div className='brand_container'>
                    <img src={logo} alt="logo" className='nav_logo' />
                    <p className='nav_title'>Tasks</p>
                </div>
                <div className='signin_container'>
                    <GoogleSignIn history={this.props.history}/>
                </div>
            </div>
        )
    }
}