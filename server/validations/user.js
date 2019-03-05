const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

var lib = {}

/**
 * @param {object} data is the requested body
 */
lib.register = data=>{
    let name = data.name ? data.name :'';
    let email = data.email ? data.email :'';
    let password = data.password ? data.password :'';

    let errors = {}
    if(Validator.isEmpty(name)){
        errors.name = 'Name is required'
    }
    if(!Validator.isEmail(email)){
        errors.email = 'Valid Email is Required'
    }
    if(Validator.isEmpty(email)){
        errors.email = 'Email is required'
    }
    if(Validator.isEmpty(password)){
        errors.password = 'password is required'
    }

    return {
        isValid:isEmpty(errors),
        errors
    }
}
/**
 * @param {object} data is the requested body
 */
lib.login = data=>{
    let email = data.email ? data.email :'';
    let password = data.password ? data.password :'';

    let errors = {}
    if(!Validator.isEmail(email)){
        errors.email = 'Valid Email is Required'
    }
    if(Validator.isEmpty(email)){
        errors.email = 'Email is required'
    }
    if(Validator.isEmpty(password)){
        errors.password = 'password is required'
    }

    return {
        isValid:isEmpty(errors),
        errors
    }
}

module.exports = lib