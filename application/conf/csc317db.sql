-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (8,'BLM','2020 ','public\\images\\upload\\95402f5f5b3f416e2f65c3f59dfd2be20da1bdf5c3c5.jpeg','public/images/upload/thumbnail-95402f5f5b3f416e2f65c3f59dfd2be20da1bdf5c3c5.jpeg',0,'2021-05-10 16:41:31',17),(9,'5 Stars','Michelin Star Quality','public\\images\\upload\\8e59413af3eee99386f5311a280c02b9c8191a4e0429.jpeg','public/images/upload/thumbnail-8e59413af3eee99386f5311a280c02b9c8191a4e0429.jpeg',0,'2021-05-10 16:45:02',17),(11,'Another World','Deep Space','public\\images\\upload\\c0825948690e868a4edbbe171328b0dbe26a34702666.jpeg','public/images/upload/thumbnail-c0825948690e868a4edbbe171328b0dbe26a34702666.jpeg',0,'2021-05-10 16:47:29',17),(15,'Aurora Borealis','Northern Lights','public\\images\\upload\\850480e64989a8c61206e7c024b902d649742af2966e.jpeg','public/images/upload/thumbnail-850480e64989a8c61206e7c024b902d649742af2966e.jpeg',0,'2021-05-10 16:50:18',17),(17,'Aurora Lights','Quiet Night','public\\images\\upload\\24bb01868a7a6695f99e2cb5ce7a590ac22d768309ee.jpeg','public/images/upload/thumbnail-24bb01868a7a6695f99e2cb5ce7a590ac22d768309ee.jpeg',0,'2021-05-10 16:52:38',17),(18,'Picture Perfect','Northern Lights','public\\images\\upload\\8fe96fd410afa49958432945413e2f07d421d285dc00.jpeg','public/images/upload/thumbnail-8fe96fd410afa49958432945413e2f07d421d285dc00.jpeg',0,'2021-05-10 16:58:37',17),(19,'Posted','Seal','public\\images\\upload\\deeb20595d70d9c6aef0c0ff7b9d7228b123176352da.jpeg','public/images/upload/thumbnail-deeb20595d70d9c6aef0c0ff7b9d7228b123176352da.jpeg',0,'2021-05-10 16:59:36',17),(20,'Favorite Animal','Polar Bear','public\\images\\upload\\6d1cd7918a9a1a84b68c4a6fe256c2776dfc4fb340ab.jpeg','public/images/upload/thumbnail-6d1cd7918a9a1a84b68c4a6fe256c2776dfc4fb340ab.jpeg',0,'2021-05-10 17:00:17',17),(25,'60th Anniversary','Disneyland','public\\images\\upload\\624359b0425f1c2c5e324e72d44acd239cc7f271e210.jpeg','public/images/upload/thumbnail-624359b0425f1c2c5e324e72d44acd239cc7f271e210.jpeg',0,'2021-05-10 17:06:27',17);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'testagain2','testtest22@email.com','$2b$10$ZGzFIoDOBhP.m8q9VYzUc.Oah2xO/FexMKoFvhVFfpxU8jp55DcPy',0,0,'2021-05-05 15:29:02'),(17,'Rockingproof','Rockingproof@yahoo.com','$2b$10$fbiG4nfd6cEgB23NdUrtS.cUJ5ETA66B4yWx9UoAdEcVeBViUqdM.',0,0,'2021-05-05 15:39:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-17 20:46:27
