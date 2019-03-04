import React from 'react';


export default ({email,password,loginUser,handleChange,errors})=> (
    <div>
        <h1>Login</h1>
        <h4>{errors.message ? 'Invalid Credentials':''}</h4>
        <label>Email</label>
        <input onChange = {handleChange} name = 'email' value={email} placeholder = 'Enter Email' />
        <input onChange = {handleChange} type="password" name = 'password' value={password} placeholder = 'Enter Password' />
        <button onClick = {loginUser}>Login</button>

    </div>
)