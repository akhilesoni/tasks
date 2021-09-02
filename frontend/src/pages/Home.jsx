import { Component } from "react";
import HomeNav from "../components/HomeNav";
import { Redirect } from 'react-router-dom';
import logo from '../images/logo.svg'
import GoogleSignIn from "../components/GoogleSignIn";
import '../style/home.css'
import tab from '../images/tab.png'
import mob from '../images/mob.png'
import laptop from '../images/lap.png'

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

                <div className='resp'>
                    
                    <div className='img_con'>
                        <img src={tab} alt="" className='tab'/>
                        <img src={mob} alt="" className='mob'/>
                        <img src={laptop} alt="" className='laptop'/>
                    </div>
                    <p className='resp_head'>Responsive Design</p>
                   
                </div>

                <div className='footer'>
                    <p className='footer_head'>Get Started with Tasks</p>
                    <div className='homesignin'>
                        <GoogleSignIn history={this.props.history}/>
                    </div>
                    <div className='contact'>
                        <p className='myname'>Made by Akhlesh soni</p>
                        <p className='button'>Contact</p>
                    </div>
                </div>
            </div>
        )
    }
}