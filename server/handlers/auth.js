const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
   try {
      //finding a user
      let user = await db.User.findOne({ email: req.body.email });
      let { id, username, avatar } = user;
      //checking if their password matches what was sent to the server
      let isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
         //log them in
         let token = jwt.sign(
            {
               id,
               username,
               avatar
            },
            process.env.SECRET_KEY
         );
         return res.status(200).json({
            id,
            username,
            avatar,
            token
         });
      } else {
         return next({
            status: 400,
            message: "Invalid email/password"
         });
      }
   } catch (err) {
      return next({
         status: 400,
         message: "Invalid email/password"
      });
   }
};

const signup = async (req, res, next) => {
   try {
      //create a user
      let user = await db.User.create(req.body);
      let { id, username, avatar } = user;
      //create a token (signing a token)
      let token = jwt.sign(
         {
            id,
            username,
            avatar
         },
         //proces.env.SECRET_KEY
         process.env.SECRET_KEY
      );
      return res.status(201).json({
         id,
         username,
         avatar,
         token
      });
   } catch (err) {
      //see what kind of error occur
      //if it is a certain error
      //respond username/email already taken
      //otherwise just send a back a generic 400

      //if validation fails
      //occur when some kind of validation failed
      if (err.code === 11000) {
         err.message = "Sorry, thaht username and/or email is already taken!";
      }
      return next({
         status: 400,
         message: err.message
      });
   }
};

exports.signup = signup;
//exports.signin = signin;
