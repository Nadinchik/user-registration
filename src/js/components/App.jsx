import React from 'react';
import { connect } from 'react-redux';
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
                password:'',
                errors:{}
            })
        })
        .catch(err=>{
            this.setState({
                errors:err.response.data
            })
        })
    }
    loginUser = e=>{
        e.preventDefault()
        this.props.loginUser(this.state)
        .then(data=>{
            this.props.history.push('/')
            this.setState({
                email:'',
                name:'',
                password:'',
                errors:{}
            })
            
        })
        .catch(err=>{
            console.log('this is the error',e)
            this.setState({
                errors:err.response.data
            })
        })
    }

    render(){
        return (
                <div className="container">
                <header className="nav navbar-inverse">
                <nav className="navbar">
                <ul>
                    <li className="nav-item"><Link to='/login'>Login</Link></li>
                    <li className="nav-item"><Link to='/register'>Signup</Link></li>
                    {
                        localStorage.getItem('token') ? (
                    <li className="nav-item"><Link to='/users'>users</Link></li>
                        ):''
                    }
                    </ul>
                </nav>
                   
                    {
                        localStorage.getItem('token') ? (
                            <button className="btn btn-secondary" onClick={()=>{
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
                        <Register {...routeProps} errors={this.state.errors} submitUser={this.submitUser} handleChange = {this.handleChange} name={this.state.name} password={this.state.password} email={this.state.email} />
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