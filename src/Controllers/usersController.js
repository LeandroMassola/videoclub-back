const User = require("../Models/users.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET;



const getUserById = async (req, res) => {

    try {

        const {id} = req.params;
        if (req.user.id !== id) {
        return res.status(403).json({ message: "No autorizado" });
        }
        const userPicked = await User.findById(id).select("-password");

        if (!userPicked) return res.status(404).json({ message: "Usuario no encontrado" });
        

        res.status(201).json({message: "ususario encontrado con exito", user: userPicked})
    } catch (error) {
        console.log("usuario no encontrado desde back:" + error);
        
    }
}

const postDataRegister = async (req, res) => {
    const {name, surname, mail, password} = req.body;
    console.log("Datos recibidos en el backend:", req.body);
    try {
        console.log(req.body)
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = await User.create({name, surname, mail, password:hashedPass});
        await newUser.save()
        res.status(201).json({message: "Usuario creado con exito"})
    } catch (error) {
        res.status(500).json({message: "error al crear el ususario: " + error})
    }
}

const postLogin = async(req, res) => {
    const {mail, password} = req.body;
    
    try {

        const user = await User.findOne({mail: mail}).exec();
        if(!user) return res.status(404).json({message:"Usuario no encontrado"})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).json({message: "Contraseña incorrecta"})
        console.log("logueado con exito");

        const payload = {
            id: user._id,
            name: user.name,
            surname: user.surname,
            mail: user.mail
        }

        const token = jwt.sign(payload, SECRET, {expiresIn:"1d"})
        console.log("Token generado:", token)
        res.status(200).json({message:"Login exitoso", token})
    } catch (error) {
        console.log("Problema en el back al loguear");
        
        res.status(500).json({message: "Problema al loguear: " + error})
    }
    
}



module.exports = {postDataRegister, postLogin, getUserById}