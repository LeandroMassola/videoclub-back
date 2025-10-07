
const { Router } = require("express");
const {getMovieReleases} = require("../Controllers/movieController") ;

const router = Router();

router.get("/", getMovieReleases)


module.exports = router
