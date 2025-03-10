const express = require('express')
const router = express.Router()

router.get("/" , (req,res)=>{
    res.status(200).json({
        message:"hello this faculty get request"
      })
    })


router.post("/" , (req,res)=>{
    res.status(200).json({
        message:"hello this faculty post request"
      })
})



module.exports = router