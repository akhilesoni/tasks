import './style/App.css';
import { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import withAuth from './withAuth'
import Dashboard from './pages/Dashboard';
export default class App extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <div className='main'>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/app'  component={withAuth(Dashboard)}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}