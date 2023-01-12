const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const cors = require("cors");
const { application } = require("express");
const { logger } = require('./logEvents');
const multer = require('multer');
const path = require('path');
const convRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');

app.use(logger);

//  handle CORS

app.use(cors());

// Mongo DB connection
dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to mongoDb")
    }catch(err){
        console.log(err)
    }
}
connect();
// this line make sure that whenever we want to get images from static folder we dont make an api request
app.use("/images", express.static(path.join(__dirname, "public/images")));

// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
//     console.log("Connected to MongDb");
// });

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// Destination for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        
        cb(null, file.originalname);
    }
});

//"Handling File Upload"
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json(req.body);
    } catch(e){
        console,log(e);
    } 
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute); 
app.use("/api/conversations", convRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, () => {
    console.log("Connected to the backend");
})