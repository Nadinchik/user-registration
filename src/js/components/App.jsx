import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router,Link,Switch,Route,withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Home from './Home'
import Register from './Register'
import Login from './Login'




class App extends React.Component{
    state = {
        name:'',
        password:'',
        email:'',
        errors:{}
    }

    handleChange = e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitUser = e=>{
        e.preventDefault()
        this.props.submitUser(this.state)
        .then(data=>{
            this.props.history.push('/login')
            this.setState({
                email:'',
                name:'',
                password:''
            })
        })
        .catch(e=>console.log(e))
    }
    loginUser = e=>{
        e.preventDefault()
        this.props.loginUser(this.state)
        .then(data=>{
            this.props.history.push('/')
            this.setState({
                email:'',
                name:'',
                password:''
            })
            .catch(e=>{
                this.setState({
                    errors:{message:'Invalid Credentials'}
                })
            })
        })
    }

    render(){
        console.log('this si th=e errors',this.state)
        return (
            
                <div>
                <header>
                    <ul>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Signup</Link></li>
                        {
                            localStorage.getItem('token') ? (
                        <li><Link to='/users'>users</Link></li>
                            ):''
                        }

                    </ul>
                    {
                        localStorage.getItem('token') ? (
                            <button onClick={()=>{
                        localStorage.removeItem('token');
                        localStorage.removeItem('name')
                        this.setState({
                            name:' '
                        })
                    }}>Logout</button>
                        ):''
                    }
                    
                </header>
                <Switch>
                    <Route exact path="/"  component = {Home} />
                    <Route path="/register" render={(routeProps=>(
                        <Register {...routeProps} submitUser={this.submitUser} handleChange = {this.handleChange} name={this.state.name} password={this.state.password} email={this.state.email} />
                    ))} />
                    <Route  path="/login" render={(routeProps=>(
                        <Login {...routeProps} errors = {this.state.errors} loginUser={this.loginUser} handleChange = {this.handleChange} name={this.state.name} password={this.state.password} email={this.state.email}  />
                    ))} />
                </Switch>
                </div>
            
        )
    }
}


export default withRouter(connect(null,{submitUser:actions.submitUser,loginUser:actions.loginUser})(App))