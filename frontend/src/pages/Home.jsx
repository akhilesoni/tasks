import { Component } from "react";
import HomeNav from "../components/HomeNav";
import { Redirect } from 'react-router-dom';
import logo from '../images/logo.svg'
import GoogleSignIn from "../components/GoogleSignIn";
import '../style/home.css'
export default class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){
       /* if(localStorage.getItem('token')){
            return <Redirect to='/app'/>
        }*/
        return (
            <div>
                <HomeNav history={this.props.history}/>

                <div className='intro_container'>
                    <img src={logo} alt="logo" className='intro_logo' />
                    <p className='intro_text'>Tasks</p>
                    <p className='intro_second'>A Desktop app for Your Tasks</p>
                    <div className='homesignin'>
                        <GoogleSignIn history={this.props.history}/>
                    </div>
                </div>
            </div>
        )
    }
}