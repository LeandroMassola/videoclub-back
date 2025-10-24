
const cors = require("cors")
const express = require("express");

const app = express();

const dotenv = require("dotenv") ;
dotenv.config();
app.use(express.json())

app.use(cors())

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("conectado a mongo"))
    .catch((err)=> console.log("error db connect: " + err));

const moviesRoutes = require("./src/Routes/movies.routes")
const usersRoutes = require("./src/Routes/users.routes")


app.use("/api/movies", moviesRoutes)
app.use("/user", usersRoutes)


app.listen(8000, ()=>{
    console.log("saliendo por puerto 8000")
})