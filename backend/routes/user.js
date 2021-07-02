// Utilisation d'express //
const express = require("express");
// Méthode de express //
const router = express.Router();

// Importe le controller //
const userCtrl = require("../controllers/user");

// Importation des middleware //
const email = require ("../middleware/verify-email"); // Validation de l'email //
const password = require ("../middleware/verify-password"); // Validation du mots de passe //
const auth = require("../middleware/auth"); // Crée un token d'identification //
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête //

// Route des users //
router.post("/login", userCtrl.login);
router.post("/signup",email, password, userCtrl.signup);
router.get("/:id/profile", auth, userCtrl.profile);
router.delete("/delete", auth, userCtrl.delete);
router.put("/modify", auth, multer, password, userCtrl.modify);

module.exports = router;
