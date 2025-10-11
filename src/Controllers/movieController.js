
const dotenv = require("dotenv") ;
dotenv.config();


const getMovieReleases = async (req, res)=> {

        console.log("entro al controller")

        const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`
        }
        }; 
        try {
            const data = await fetch(url, options)
            const movies = await data.json()
            res.status(200).json(movies.results)
        } catch (error) {
            console.log("error al buscar las pelis")
            res.status(500).json({
                message: "entro al error del catch",
                error: error.message
            })
        }
        

        
    }

    module.exports = {getMovieReleases}