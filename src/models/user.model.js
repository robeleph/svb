const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    isAdmin : Boolean
});


//custom method to generate authToken 
UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
  }


  const User = mongoose.model('User', UserSchema);


  //function to validate user 
function validateUser(user) {
    const schema = {
      fname: Joi.string().min(3).max(50).required(),
      lname: Joi.string().min(3).max(255).required(),
      email: Joi.string().min(5).max(255).required().email(),
      username: Joi.string().min(3).max(255).required(),
      phoneNo: Joi.string().min(3).max(255).required(),
      password: Joi.string().min(3).max(255).required()

    };
  
    return Joi.validate(user, schema);
  }
  
  exports.User = User; 
  exports.validate = validateUser;