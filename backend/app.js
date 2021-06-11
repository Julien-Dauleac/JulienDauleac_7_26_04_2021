// Modules //
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const helmet = require("helmet");
const expressSanitizer = require('express-sanitizer');
const mysql = require('mysql');
require("dotenv").config()

// CONNEXION BASE DE DONNEE
exports.connection = mysql.createPool({
    host     : 'localhost',
    user     : `${process.env.DB_USER}`,
    password : `${process.env.DB_MDP}`,
    database : 'groupomania',
    timezone : 'local',
    charset : 'utf8mb4'
});
// FIN CONNEXION

// Importation des routes //
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// Helmet //
app.use(helmet()); // Protège l'app en paramétrant des Headers (notamment contre les failles XSS) //

// Parametre des Headers //
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
app.use(bodyParser.json()); // Rend le corps de la requête exploitable facilement

// Express_Sanitizer //
app.use(expressSanitizer()); // Protège contre les failles XSS

// Routes //
app.use("/images", express.static(path.join(__dirname, "images")));
// Va servir les routes dédiées aux utilisateurs //
app.use("/api/user", userRoutes);
// Va servir les routes dédiées aux posts //
app.use("/api/post", postRoutes);

// Export de l'application express pour déclaration dans server.js //
module.exports = app;
