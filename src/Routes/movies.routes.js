
const { Router } = require("express");
const {getMovieReleases, getMovieDetail, getMovieTrailer} = require("../Controllers/movieController") ;

const router = Router();

/* router.get("/", getMovieReleases) */
router.get("/:id/", getMovieDetail)

module.exports = router
