// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');

// // Create an Express application
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // MongoDB Connection


// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected successfully"))
//     .catch(err => console.log("MongoDB connection error:", err));

// // Define a simple route
// app.get('/', (req, res) => {
//     res.send("Welcome to the Node.js MongoDB App");
// });

// // Start the server
// const PORT = process.env.PORT || 3002;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const studentRoute = require("./api/routes/student")
const facultyRoute = require("./api/routes/faculty")
const signupRoute = require("./api/routes/user")
const authRoute = require("./api/routes/auth")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const exphbs = require('express-handlebars');
// const handlebars = require('handlebars');
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// const path = require('path');

const app = express();

mongoose.connect("mongodb+srv://ashishchoudhary:Ashish1234@cluster0.olkmh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");
mongoose.connection.on("error", err => {
    console.log("error message")
})

mongoose.connection.on("connected", connect => {
    console.log("connected")
})

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
   }))   

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/student", studentRoute)

app.use("/faculty", facultyRoute)

app.use("/user", signupRoute)

app.use("/",authRoute)
 

app.use((req, res) => {
    res.status(404).json({
        message: " 404 Bad Request"
    })
})


// app.use("/",(req,res)=>{
// res.send("starting working ")
// })

app.listen(3003,'0.0.0.0', () => {
    console.log("server will start at 3003")
})
