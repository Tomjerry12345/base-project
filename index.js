const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 4000;

// const dbUrl = 'mongodb://admin:admin@dbhasiltani-shard-00-00.r5lx4.mongodb.net:27017,dbhasiltani-shard-00-01.r5lx4.mongodb.net:27017,dbhasiltani-shard-00-02.r5lx4.mongodb.net:27017/dbHasilTani?ssl=true&replicaSet=atlas-3o0w7g-shard-0&authSource=admin&retryWrites=true&w=majority'
// const dbUrl =
//   "mongodb://kiki:kiki12345@dbtani-shard-00-00.n3snp.mongodb.net:27017,dbtani-shard-00-01.n3snp.mongodb.net:27017,dbtani-shard-00-02.n3snp.mongodb.net:27017/db_tani?ssl=true&replicaSet=atlas-ns9o97-shard-0&authSource=admin&retryWrites=true&w=majority";

const app = express();

const mysqlExamplesRouters = require("./src/examples/routers/mysql/ExamplesRouters");
const mongodbExamplesRouters = require("./src/examples/routers/mongodb/ExamplesRouters");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype==='image/png') {
      cb(null, 'images')
    } 
    else if (file.mimetype === 'application/pdf') {
        cb(null, 'files')
    } 
    else {
        console.log('Mime type not supportbed')
        cb({ error: 'Mime type not supportbed' })
    }
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype==='image/png') {
      cb(null, new Date().getTime() + "-" + file.originalname + ".png");
    } else if (file.mimetype === 'application/pdf') {
      cb(null, new Date().getTime() + "-" + file.originalname + ".pdf");
   } 
    
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.fieldname === "file") { // if uploading resume
//     if (
//       file.mimetype === 'application/pdf' ||
//       file.mimetype === 'application/msword' ||
//       file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ) { // check file type to be pdf, doc, or docx
//       cb(null, true);
//     } else {
//       cb(null, false); // else fails
//     }
//   } else { // else uploading image
//     if (
//       file.mimetype === 'image/png' ||
//       file.mimetype === 'image/jpg' ||
//       file.mimetype === 'image/jpeg'
//     ) { // check file type to be png, jpeg, or jpg
//       cb(null, true);
//     } else {
//       cb(null, false); // else fails
//     }
//   }
// };

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.use(
  multer(
    { 
      storage: fileStorage, 
      limits:
        { 
          fileSize:'2mb' 
        }, 
      // fileFilter: fileFilter 
    }
  ).fields(
    [
      { 
        name: 'file', 
        maxCount: 1 
      }, 
      { 
        name: 'image', 
        maxCount: 1 
      }
    ]
  )
);

app.use("/mysql", mysqlExamplesRouters)
// app.use("/mongodb", mongodbExamplesRouters)

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status).send({ message: message });
});

app.listen(4000, () => console.log(`Connection Succes ${4000}`))
// mongoose
//   .connect(dbUrl)
//   .then(() => {
//     app.listen(port, () => console.log(`Connection Succes ${port}`));
//   })
//   .catch((err) => console.log(err));
