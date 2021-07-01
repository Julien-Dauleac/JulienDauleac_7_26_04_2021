-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
                        `postID` mediumint unsigned NOT NULL AUTO_INCREMENT,
                        `userID` smallint unsigned DEFAULT NULL,
                        `legend` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `gifUrl` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `postIDComment` mediumint unsigned DEFAULT NULL,
                        `body` text COLLATE utf8mb4_unicode_ci,
                        `dateCreation` datetime NOT NULL,
                        PRIMARY KEY (`postID`),
                        KEY `fk_commentID` (`postIDComment`),
                        KEY `fk_post_userID` (`userID`),
                        CONSTRAINT `fk_commentID` FOREIGN KEY (`postIDComment`) REFERENCES `post` (`postID`) ON DELETE CASCADE,
                        CONSTRAINT `fk_post_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (166,42,'Coucou :','http://localhost:3000/images/Mayonnaise_de_Dijon.jpg1625059953254.jpeg',NULL,NULL,'2021-06-30 15:32:33'),(172,56,'Bonjour','http://localhost:3000/images/Ketchup_Heinz.jpg1625136645998.jpeg',NULL,NULL,'2021-07-01 12:50:46'),(173,56,NULL,NULL,166,'Salut !','2021-07-01 12:50:52'),(174,42,NULL,NULL,172,'Coucou !','2021-07-01 12:51:10');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-01 14:38:55
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reaction`
--

DROP TABLE IF EXISTS `reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction` (
                            `userID` smallint unsigned NOT NULL,
                            `postID` mediumint unsigned NOT NULL,
                            `reaction` tinyint DEFAULT NULL,
                            `dateCreation` datetime NOT NULL,
                            PRIMARY KEY (`userID`,`postID`),
                            KEY `fk_postID` (`postID`),
                            CONSTRAINT `fk_postID` FOREIGN KEY (`postID`) REFERENCES `post` (`postID`) ON DELETE CASCADE,
                            CONSTRAINT `fk_reaction_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction`
--

LOCK TABLES `reaction` WRITE;
/*!40000 ALTER TABLE `reaction` DISABLE KEYS */;
INSERT INTO `reaction` VALUES (42,166,-1,'2021-07-01 14:37:27'),(42,172,1,'2021-07-01 12:51:16'),(42,173,1,'2021-07-01 12:51:20'),(42,174,1,'2021-07-01 14:37:35'),(56,166,-1,'2021-07-01 12:51:31'),(56,172,1,'2021-07-01 14:37:11'),(56,173,1,'2021-07-01 14:37:16'),(56,174,1,'2021-07-01 12:51:29');
/*!40000 ALTER TABLE `reaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
                        `userID` smallint unsigned NOT NULL AUTO_INCREMENT,
                        `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
                        `firstName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                        `lastName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                        `pseudo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
                        `admin` tinyint DEFAULT NULL,
                        `bio` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `avatarUrl` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://localhost:3000/images/avatarIcon.jpg',
                        `dateCreation` datetime NOT NULL,
                        PRIMARY KEY (`userID`),
                        UNIQUE KEY `email` (`email`),
                        UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (42,'julie@groupomania.com','Julie','Sonet','Juju','$2b$10$XLUDzO3s7vTqSBgUpub5Vefvx29H5ngEj8PMyfXE8JB7VhpRhfOlK',0,'Jeune dev !','http://localhost:3000/images/avatarIcon.jpg','2021-06-29 15:48:56'),(56,'julien@groupomania.com','Julien','Dauleac','','$2b$10$4iJw4H/xF8ahkAkZ8uq.AuqL5QCYaZve8Lpu4AiwO9Jf.ti9LVdOi',1,'Administrateur','http://localhost:3000/images/avatar-1577909_960_720_1625136621402.png','2021-07-01 12:49:55');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-01 14:38:55
