const validator = require('validator');
const isEmpty = require('./is_empty');


module.exports = function validateProfileInput(data) {
    let errors = {};

  
    data.handle = !isEmpty(data.handle) ? data.email : '';
    data.status = !isEmpty(data.status) ? data.password : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    if(!validator.isLength(data.handle, {min : 2, max : 40})){
            errors.handle = "Handle should be between 2 and 40 characters";
    }
    
    if(!validator.isEmpty(data.handle)){
        errors.handle = "handle is required";
    }

    if(!validator.isEmpty(data.status)){
        errors.handle = "status is required";
    }

    if(!validator.isEmpty(data.skills)){
        errors.handle = "Skills field is required";
    }

    if(!validator.isEmpty(data.website)){
        if(!validator.isURL(data.website))
        errors.website = "Not a valid URL";
    }
    if(!validator.isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube))
        errors.youtube = "Not a valid URL";
    }
    if(!validator.isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter))
        errors.twitter = "Not a valid URL";
    }
    if(!validator.isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin))
        errors.website = "Not a valid URL";
    }
    if(!validator.isEmpty(data.linkedin)){
        if(!validator.isURL(data.website))
        errors.linkedin = "Not a valid URL";
    }

    if(!validator.isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram))
        errors.instagram = "Not a valid URL";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}