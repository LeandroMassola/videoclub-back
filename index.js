
const cors = require("cors")
const express = require("express");

const app = express();

const moviesRoutes = require("./src/Routes/movies.routes")
app.use(express.json())

app.use(cors())

app.use("/api/movies", moviesRoutes)


app.listen(8000, ()=>{
    console.log("saliendo por puerto 8000")
})