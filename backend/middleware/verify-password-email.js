const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

module.exports = (req, res, next) => {
    // on vérifie le password et l'email
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is()
        .min(8) // Minimum length 8
        .is()
        .max(20) // Maximum length 20
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .not()
        .symbols(); // Has no symbols
    //.has().not().spaces()
    // Should not have spaces is a wrong rule to apply

    if (
        !emailValidator.validate(req.body.email) ||
        !passwordSchema.validate(req.body.password)
    ) {
        return res.status(400).send({
            error:
                "Merci de vérifier votre adresse mail, le mot de passe doit contenir au minimum 8 lettres avec des minuscules et majuscules",
        });
    } else if (
        emailValidator.validate(req.body.email) ||
        passwordSchema.validate(req.body.password)
    ) {
        next();
    }
};
