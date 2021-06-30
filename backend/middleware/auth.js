// Modules //
const jwt = require("jsonwebtoken"); // Crée et check un token d'identification sécurisé //


// Middleware Auth //
module.exports = (req, res, next) => { // Vérifie si le token est bon //
    try { // Vérifie si le token est bon grâce à notre phrase secrète //
        const token = req.headers.authorization.split(" ")[1]; // Récupère le token dans l'entête //
        const decodedToken = jwt.verify(token, process.env.TOKEN); // On vérifie le token avec la clé pour le lire //
        res.locals.userID = decodedToken.userID; // Le token devient un objet JS qu'on place dans une constante, et on y récupère l'user ID pour comparaison //
        res.locals.admin = decodedToken.admin; // On vérifie si l'utilisateur est admin //
        next();
    } catch{ // Problème d'autentification si erreur dans les instructions on renvoie le statut 401 non autorisé //
        res.status(401).json({message: 'Requête non authentifiée !'});
    }
};
