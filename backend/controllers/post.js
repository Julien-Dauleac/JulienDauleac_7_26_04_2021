// Modules //
const mysql = require('../app').connection; // Permet de récupérer la connexion à la base de donnée //
const fs = require("fs"); // Permet de gérer les fichiers stockés //

// Pour obtenir tous les messages //
exports.getAllPosts = (req, res, next) => {
    const userID = res.locals.userID;

    let sqlGetPosts;

    sqlGetPosts = `SELECT post.postID, post.userID, legend, gifUrl, DATE_FORMAT(post.dateCreation, 'le %e %M %Y à %kh%i') AS dateCreation, firstName, lastName, pseudo, avatarUrl,
    COUNT(CASE WHEN reaction.reaction = 1 then 1 else null end) AS countUp,
    COUNT(CASE WHEN reaction.reaction = -1 then 1 else null end) AS countDown,
    SUM(CASE WHEN reaction.userID = ? AND reaction.reaction = 1 then 1 WHEN reaction.userID = ? AND reaction.reaction = -1 then -1 else 0 end) AS yourReaction,
    COUNT(CASE WHEN post.userID = ? then 1 else null end) AS yourPost
    FROM post LEFT OUTER JOIN user ON post.userID = user.userID LEFT OUTER JOIN reaction ON post.postID = reaction.postID WHERE post.postIDComment IS NULL GROUP BY post.postID ORDER BY post.postID DESC`;
    mysql.query(sqlGetPosts, [userID, userID, userID], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        res.status(200).json(result);
    });
};

// Pour obtenir un message //
exports.getOnePost = (req, res, next) => {
    const userID = res.locals.userID;
    const postID = req.params.id;

    let sqlGetPost;

    sqlGetPost = `SELECT post.postID, post.userID, legend, body, gifUrl, DATE_FORMAT(post.dateCreation, 'le %e %M %Y à %kh%i') AS dateCreation, firstName, lastName, pseudo, avatarUrl,
    COUNT(CASE WHEN reaction.reaction = 1 then 1 else null end) AS countUp,
    COUNT(CASE WHEN reaction.reaction = -1 then 1 else null end) AS countDown,
    SUM(CASE WHEN reaction.userID = ? AND reaction.reaction = 1 then 1 WHEN reaction.userID = ? AND reaction.reaction = -1 then -1 else 0 end) AS yourReaction,
    COUNT(CASE WHEN post.userID = ? then 1 else null end) AS yourPost
    FROM post LEFT OUTER JOIN user ON post.userID = user.userID LEFT OUTER JOIN reaction ON post.postID = reaction.postID WHERE post.postID = ? OR post.postIDComment = ? GROUP BY post.postID ORDER BY post.postID DESC`;
    mysql.query(sqlGetPost, [userID, userID, userID, postID, postID], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        }
        res.status(200).json(result);
    });
};

// Pour céer les messages //
exports.createPost = (req, res, next) => {
    const userID = res.locals.userID;
    const legend = req.body.legend;
    const gifUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    console.log(gifUrl);
    console.log(req.file.filename);

    let sqlCreatePost;
    let values;

    sqlCreatePost = "INSERT INTO post VALUES (NULL, ?, ?, ?, NULL, NULL, NOW())";
    values = [userID, legend, gifUrl];
    mysql.query(sqlCreatePost, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.status(201).json({ message: "Post créé !" });
    });
};

// Pour supprimer les messages //
exports.deletePost = (req, res, next) => {
    const postID = req.params.id;
    const userID = res.locals.userID;

    let sqlDeletePost;
    let sqlSelectPost;

    sqlSelectPost = "SELECT gifUrl FROM post WHERE postID = ?";
    mysql.query(sqlSelectPost, [postID], function (err, result) {
        if (result > 0) {
            const filename = result[0].gifUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => { // On supprime le fichier image en amont //
                sqlDeletePost = "DELETE FROM post WHERE userID = ? AND postID = ?";
                mysql.query(sqlDeletePost, [userID, postID], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    }
                    res.status(200).json({ message: "Post supprimé !" });
                });
            });
        } else {
            sqlDeletePost = "DELETE FROM post WHERE userID = ? AND postID = ?";
            mysql.query(sqlDeletePost, [userID, postID], function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                res.status(200).json({ message: "Post supprimé !" });
            });
        }
        if (err) {
            return res.status(500).json(err.message);
        }


    });
};

// Pour créer des commentaires //
exports.createComment = (req, res, next) => {
    const postID = req.params.id;
    const userID = res.locals.userID;
    const body = req.body.body;

    let sqlCreateComment;
    let values;

    sqlCreateComment = "INSERT INTO post VALUES (NULL, ?, NULL, NULL, ?, ?, NOW())";
    values = [userID, postID, body];
    mysql.query(sqlCreateComment, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.status(201).json({ message: "Commentaire crée !" });
    });
};

// Pour créer une réaction sur les messages //
exports.reactPost = (req, res, next) => {
    const userID = res.locals.userID;
    const reaction = req.body.reaction;
    const postID = req.params.id;

    let sqlReaction;
    let values;

    sqlReaction = `INSERT INTO reaction VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE reaction = ?`;
    values = [userID, postID, reaction, reaction];
    mysql.query(sqlReaction, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.status(201).json({ message: "Réaction crée !" });
    });
};
