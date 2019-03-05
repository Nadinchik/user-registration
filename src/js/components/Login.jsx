import React from 'react';


export default ({email,password,loginUser,handleChange,errors})=> (
    <div>
        <h1>Login</h1>
        <h4>{errors.form ? 'Invalid Credentials':''}</h4>
        <form method="post" onSubmit={loginUser}>
        <label>Email</label>
        <input onChange = {handleChange} name = 'email' value={email} placeholder = 'Enter Email' />
        <small>{errors.email ? errors.email : ''}</small>
        <input onChange = {handleChange} type="password" name = 'password' value={password} placeholder = 'Enter Password' />
        <small>{errors.password ? errors.password : ''}</small>
        <button className="btn btn-primary" onClick = {loginUser} onSubmit={loginUser}>Login</button>
        </form>

    </div>
)