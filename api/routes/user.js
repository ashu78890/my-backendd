const express = require("express")
const SignupUser = require("../../models/signup")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const signup = require("../../models/signup")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    }
    else {
      const user = new SignupUser({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        mobile: req.body.mobile
      })
      user.save().then((result) => {
        res.status(200).json(
          {
            newUser: result
          }
        )
      }).catch((err) => {
        res.status(500).json({
          error: err
        })
      })
    }
  });
})


router.post("/login", (req, res) => {
  SignupUser.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {``
        return res.status(404).json({
          message: "User Not Found"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "password not match"
          })
        }
        if(result){
          const token = jwt.sign({
            username :user[0].username,
            password:user[0].password,
            mobile:user[0].mobile,
            email:user[0].email
          },'secretKey',{expiresIn:"24h"})

          res.status(200).json({
            username :user[0].username,
            password:user[0].password,
            mobile:user[0].mobile,
            email:user[0].email,
            token:token
          })
        }

      })

    }).catch((err)=>{
      res.status(500).json({
        error:err
      })
    })

})



module.exports = router