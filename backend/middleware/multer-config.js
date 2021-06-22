// Modules //
const multer = require('multer');

// Type Mime //
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
};

// Fonction Storage //
const storage = multer.diskStorage({ // Configure multer //
    destination: (req, file, callback) => { // Indique où enregistrer les fichiers //
        callback(null, 'images');
    },
    filename: (req, file, callback) => { // Indique le nom du fichier //
        let name = file.originalname.split(' ').join('_'); // Pour éliminer les éventuelles espaces du nom d'origine //
        let extension = MIME_TYPES[file.mimetype]; // Défini le type //
        name = name.replace("." + extension, "_"); // création du nom final //
        callback(null, name + Date.now() + '.' + extension); // Génère le nom complet du fichier - Nom d'origine + numéro unique + . + extension //
    }
});

// Export de l'élément multer, seuls les fichiers de type image seront gérés //
module.exports = multer({
    storage: storage
}).single('image');
