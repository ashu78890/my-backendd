const express = require('express')
const router = express.Router()
const Student = require("../../models/studentModel")
const { default: mongoose } = require('mongoose')
const checkauth = require("../../middleware/check-auth")
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
  cloud_name: 'dcskyzzp4', 
  api_key: '435414134345242', 
  api_secret: 'v82bf0KGP1Qc_RjcX_8ba9VZwLU' 
});

router.get("/", checkauth,(req, res) => {
  Student.find()
    .then(result => {
      res.status(200).json({
        stdentList: result
      })
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.post("/", checkauth,(req, res) => {
  const file = req.files.image
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result,"result")
    const student = new Student(
      {
        id: new mongoose.Types.ObjectId,
        name: req.body.name,
        rollNo: req.body.rollNo,
        gender: req.body.gender,
        image: result.url
      }
    )

  student.save()
    .then((result) => {
      console.log(result, "result");
      res.status(200).json({
        newStudent: result
      })

    }).catch(err => {
      console.log(err, "erroe")
      res.status(500).json({
        errror: err
      })
    })
  })
})


router.get("/:id",checkauth, (req, res) => {
  console.log(req.params.id)
  Student.findById(req.params.id)

    .then((result) => {
      res.status(200).json({
        student: result
      })
    }).catch((err) => {
      res.status(500).json({
        error: err
      })
    })
})


router.delete("/:id",checkauth, (req, res) => {
  const studentId = req.params.id;

  Student.findByIdAndDelete(studentId)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Student deleted successfully",
          student: result,
        });
      } else {
        res.status(404).json({
          message: "Student not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});


router.put("/:id",checkauth, (req, res) => {
  Student.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      rollNo: req.body.rollNo,
      gender: req.body.gender
    }
  })

    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Student updated successfully",
          student: result,
        });
      } else {
        res.status(404).json({
          message: "Student not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });

})


router.post("/upload",(req,res)=>{

  console.log(file,"dfhj")
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result,"result")
  })
})


module.exports = router;