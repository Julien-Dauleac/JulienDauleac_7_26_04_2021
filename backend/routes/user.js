// Utilisation d'express //
const express = require("express");
// Méthode de express //
const router = express.Router();

// Importe le controller //
const userCtrl = require("../controllers/user");

// Importation des middleware //
const auth = require("../middleware/auth"); // Crée un token d'identification //
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête //

// Route des users //
router.post("/signup", userCtrl.signup);
router.post("/", userCtrl.login);
router.delete("/delete", auth, userCtrl.delete);
router.get("/:id/profile", auth, userCtrl.profile);
router.put("/modify", auth, multer, userCtrl.modify);

module.exports = router;
