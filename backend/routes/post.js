// Utilisation d'express //
const express = require("express");
// Méthode de express //
const router = express.Router();

// Importe le controller //
const postCtrl = require("../controllers/post");

// On importe le middleware auth pour sécuriser les routes et le middleware multer pour la gestion des images
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête

// Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers //
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/comment", auth, postCtrl.createComment);
router.post("/:id/reaction", auth, postCtrl.reactPost);

module.exports = router;
