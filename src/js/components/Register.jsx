import React from 'react';

export default ({handleChange,submitUser,email,name,password})=> (
    <div>
        <h1>Register</h1>
        <label>Name</label>
        <input onChange = {handleChange} name = 'name' value={name} placeholder = 'Enter Name' />
        <label>Email</label>
        <input onChange = {handleChange} name = 'email' value={email} placeholder = 'Enter Email' />
        <label>Password</label>
        <input onChange = {handleChange} type="password" name = 'password' value={password} placeholder = 'Enter Password' />
        <button onClick = {submitUser}>submit</button>
    </div>
)