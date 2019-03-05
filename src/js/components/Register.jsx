import React from 'react';

export default ({handleChange,submitUser,email,name,password,errors})=> (
    <div>
        <h1>Register</h1>
        <form method="post" onSubmit={submitUser}>
        <label>Name</label>
        <input onChange = {handleChange} name = 'name' value={name} placeholder = 'Enter qpost' />
        <small>{errors.name ? errors.name : ''}</small>
        <label>Email</label>
        <input onChange = {handleChange} name = 'email' value={email} placeholder = 'Enter Email' />
        <small>{errors.email ? errors.email : ''}</small>
        <label>Password</label>
        <input onChange = {handleChange} type="password" name = 'password' value={password} placeholder = 'Enter Password' />
        <small>{errors.password ? errors.password : ''}</small>
        <button className="btn btn-primary" onClick = {submitUser} onSubmit={submitUser}>submit</button>
        </form>
    </div>
)