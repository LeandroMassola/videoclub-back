const jwt = require("jsonwebtoken")

const logAuth = (req, res, next) => {

    try {
        const authHeader = req.headers["authorization"];

        if(!authHeader) {
            return res.status(401).json({message: "Token no proporcionado"})
        }

        const token = authHeader.split(" ")[1];

        if(!token){return res.status(401).json({message:"Formato de token invalido"})}

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedToken;
        next()



    } catch (error) {
        console.log("error al verificar token: " + error);
        res.status(401).json({message: "Token invalido o expirado"})
    }
}

module.exports = logAuth