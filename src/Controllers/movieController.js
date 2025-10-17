


let cache = null;
let lastFetch = 0;

const getMovieReleases = async (req, res)=> {

    const now = Date.now();
    if (cache && now - lastFetch < 1000 * 60 * 5) { // cacheReleases 5 min
        return res.json(cache);
    }

    const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const options = {
        method: "GET",
        headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
        },
    };

    try {
        console.log("🌐 Llamando a TMDB...");
        const response = await fetch(url, options);
        
        // Si TMDB responde con error
        if (!response.ok) {
            throw new Error(`TMDB responded with status ${response.status}`);
        }
        
        const data = await response.json();

        // Guardamos cache
        cache = data.results;
        lastFetch = now;
        console.log(data)
        res.status(200).json(cache && data.results);
    } catch (error) {
        console.error("❌ Error al obtener películas:", error.message);

        res.status(500).json({
            message: "Error al obtener películas desde TMDB",
            error: error.message,
        });
    }
}


let cacheDetail = null;
let lastFetchDetail = 0;


const getMovieDetail = async (req, res) => {

    const url = `https://api.themoviedb.org/3/movie/${req.params.id}?language=en-US`;
    const urlTrailer = `https://api.themoviedb.org/3/movie/${req.params.id}/videos`;
    const urlCredits = `https://api.themoviedb.org/3/movie/${req.params.id}/credits`;
    const now = Date.now();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`
        }
        };

    
    if (cacheDetail && now - lastFetchDetail < 1000 * 60 * 5) { // cacheRealeases 5 min
        return res.json(cacheDetail);
    }

        try {

            const [data, dataTrailer, dataCredits] = await Promise.all([
                fetch(url, options),
                fetch(urlTrailer, options),
                fetch(urlCredits, options)
            ])

            const movie = await data.json();
            const movieTrailer = await dataTrailer.json();
            const movieCredits = await dataCredits.json();

            const officialTrailer = movieTrailer.results.find((video) => video.type == "Trailer" && video.site == "YouTube")

            movie.trailer = officialTrailer ? officialTrailer.key : null;
            movie.credits = movieCredits ? movieCredits.cast : null;

            cacheDetail = req.params.id != movie.id && movie  
            lastFetchDetail = now

            res.status(200).json(movie)
            } catch (error) {
            console.log("error al buscar las pelis")
            res.status(500).json({
                message: "entro al error del catch",
                error: error.message
            })
        }
}



    module.exports = {getMovieReleases, getMovieDetail}