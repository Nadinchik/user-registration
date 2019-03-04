import React from 'react';

export default ()=>(
    <h1>{localStorage.getItem('name') ? `Welcome ${localStorage.getItem('name')}!`:'You are not logged in'}</h1>
)