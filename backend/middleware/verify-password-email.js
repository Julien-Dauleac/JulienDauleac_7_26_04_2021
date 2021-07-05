// On importe email-validator //
const emailValidator = require("email-validator");
// On importe password-validator //
const passwordValidator = require("password-validator");

module.exports = (req, res, next) => {
    // Schéma de mot de passe plus sécurisé //
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8)                               // Longueur minimum : 8 //
        .is().max(100)                             // Longueur maximum : 100 //
        .has().uppercase()                              // Doit avoir au moins une majuscule //
        .has().lowercase()                              // Doit avoir au moins une minuscule //
        .has().digits()                                 // Doit avoir au moins un chiffre //
        .has().not().spaces()                           // Ne doit pas avoir d'espaces //
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist de valeurs à proscrire //

    // On vérifie le password et l'email //
    if (
        !emailValidator.validate(req.body.email) ||
        !passwordSchema.validate(req.body.password)
    ) {
        return res.status(400).send({
            error:
                "Email ou mot de passe invalide",
        });
    } else if (
        emailValidator.validate(req.body.email) ||
        passwordSchema.validate(req.body.password)
    ) {
        next();
    }
};
