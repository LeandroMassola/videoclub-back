const { Router } = require("express");
const { postLogin, postDataRegister, getUserById } = require("../Controllers/usersController");
const logAuth = require("../Middlewares/logAuth");
const registerValidation = require("../Validations/registerValidation");

const router = Router();


router.post("/register", registerValidation, postDataRegister)
router.post("/login", postLogin)
router.get("/:id", logAuth, getUserById)

module.exports = router