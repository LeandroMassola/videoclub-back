const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    mail: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

const User = model("User", userSchema)

module.exports = User

