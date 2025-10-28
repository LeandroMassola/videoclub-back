const {body} = require("express-validator");

module.exports = [
    body("name").bail().notEmpty().isLength({min:2}).withMessage("You must input a your name"),
    body("surname").bail().notEmpty().isLength({min:2}).withMessage("You must input a your last name"),
    body("mail").bail().notEmpty().withMessage("You must input a email").isLength({min:2}).isEmail().withMessage("You must input a valid email"),
    body("password")
    .notEmpty()
    .withMessage("You must input a password")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters")
]