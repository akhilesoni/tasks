import { Component } from "react";
import logo from '../images/logo.svg'

export default class DashNav extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:props.user,
            active:true
        }
    }
    getClass(){
        if(this.state.active){
            return 'fl_pro'
        }else{
            return 'fl_pro_i'
        }
    }

    toggle(){
        if(this.state.active){
            this.setState({
                active:false
            })
        }else{
            this.setState({
                active:true
            })
        }
    }
    signout(){
        this.props.history.push('/')
    }
    render(){
        return (
            <div className='navbar'>
                <div className='brand_container'>
                    <img src={logo} alt="logo" className='nav_logo' />
                    <p className='nav_title'>Tasks</p>
                </div>
                <div className='dash_right_container'>
                    <img onClick={this.toggle.bind(this)} src={this.state.user.photo} alt="profile" className='nav_profile'/>
                </div>
                <div className={this.getClass()}>
                    <img src={this.state.user.photo} alt="profile" className='fl_pro_im'/>
                    <p className='user_name'>{this.state.user.name}</p>
                    <p className='email'>{this.state.user.email}</p>
                    <div onClick={this.signout.bind(this)} className='signout'>
                        Signout
                    </div>
                </div>
            </div>
        )
    }
}