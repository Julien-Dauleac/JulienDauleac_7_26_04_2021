// Import des modules npm - Ajout des plugins externes //
const express = require('express');
// Création d'une application express //
const app = express();
// Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande, on importe donc body-parser //
const bodyParser = require('body-parser');
// On donne accès au chemin de notre système de fichier, plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier //
const path = require("path");
// On importe helmet pour plus de sécurité sur l'application //
const helmet = require("helmet");
// On importe expressSanitizer pour fournir une atténuation des risques XSS persistant de base //
const expressSanitizer = require('express-sanitizer');
// On importe mysql pour pouvoir utiliser la base de données //
const mysql = require('mysql');
// Require et configuration de Dotenv //
require("dotenv").config()

// Connexion base de donnée //
exports.connection = mysql.createPool({
    host     : 'localhost',
    user     : `${process.env.DB_USER}`,
    password : `${process.env.DB_MDP}`,
    database : `${process.env.DB_NAME}`,
    timezone : 'local',
    charset : 'utf8mb4'
});

// Importation des routes //
// On importe la route dédiée aux users //
const userRoutes = require("./routes/user");
// On importe la route dédiée aux posts //
const postRoutes = require("./routes/post");

// Helmet //
app.use(helmet()); // Protège l'app en paramétrant des Headers (notamment contre les failles XSS) //

// Paramètre des Headers //
app.use((req, res, next) => { // Evite les erreurs CORS //
// on indique que les ressources peuvent être partagées depuis n'importe quelle origine //
    res.setHeader('Access-Control-Allow-Origin', '*');
// on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation //
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// on indique les méthodes autorisées pour les requêtes HTTP //
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// BodyParser //
app.use(bodyParser.json()); // Rend le corps de la requête exploitable facilement //

// Express_Sanitizer //
app.use(expressSanitizer()); // Protège contre les failles XSS //

// Routes //
app.use("/images", express.static(path.join(__dirname, "images")));
// Va servir les routes dédiées aux utilisateurs //
app.use("/api/user", userRoutes);
// Va servir les routes dédiées aux posts //
app.use("/api/post", postRoutes);

// Export de l'application express pour déclaration dans server.js //
module.exports = app;
