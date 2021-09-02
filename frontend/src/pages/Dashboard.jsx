import { Component } from "react";
import DashboardCom from "../components/DashBoardCom";
import '../style/App.css'


export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:null
        }
    }

    

    render(){
        return (
            <div>
                <DashboardCom history={this.props.history}/>
            </div>
        )
    }
}