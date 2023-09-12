import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import router from "./routes/route.js";
import cors from "cors";

// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

const app = express();

/*Loading the envrionment variables */
env.config();

/*connecting the database */
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Data Base Connected Sucessfully");
  })
  .catch((error) => console.log(error));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// console.log(__dirname);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// app.use("/Images", express.static(path.join(__dirname, "/Images")));

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   console.log("inside the rul");
//   res.status(200).json("File has been uploaded");
// });

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use("/api", router);

/*Creating server using express.
listen function takes two arguments 
1.PORT : port on which we should run our backend server
2.Call Back Function : If wish to perform something
after the server creation, we can do it in this call back function.*/
app.listen(process.env.PORT, () => {
  console.log(`Sereve running Successfully on PORT ${process.env.PORT}`);
});
