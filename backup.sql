mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.40, for Linux (aarch64)
--
-- Host: localhost    Database: my_resume
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `achievement_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `issued_by` varchar(100) DEFAULT NULL,
  `issued_date` date DEFAULT NULL,
  PRIMARY KEY (`achievement_id`),
  KEY `fk_achievements_user` (`user_id`),
  CONSTRAINT `fk_achievements_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analytics`
--

DROP TABLE IF EXISTS `analytics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analytics` (
  `analytics_id` int NOT NULL AUTO_INCREMENT,
  `page_name` varchar(100) DEFAULT NULL,
  `views` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`analytics_id`),
  KEY `fk_analytics_user` (`user_id`),
  CONSTRAINT `fk_analytics_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analytics`
--

LOCK TABLES `analytics` WRITE;
/*!40000 ALTER TABLE `analytics` DISABLE KEYS */;
/*!40000 ALTER TABLE `analytics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language_id` int DEFAULT NULL,
  `framework_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_blog_posts_user` (`user_id`),
  KEY `fk_blog_posts_language` (`language_id`),
  KEY `fk_blog_posts_framework` (`framework_id`),
  CONSTRAINT `fk_blog_posts_framework` FOREIGN KEY (`framework_id`) REFERENCES `frameworks` (`framework_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_posts_language` FOREIGN KEY (`language_id`) REFERENCES `programming_languages` (`language_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_posts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certifications`
--

DROP TABLE IF EXISTS `certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certifications` (
  `certification_id` int NOT NULL AUTO_INCREMENT,
  `certification_name` varchar(255) NOT NULL,
  `certification_date` date NOT NULL,
  `grade` float DEFAULT NULL,
  PRIMARY KEY (`certification_id`),
  CONSTRAINT `certifications_chk_1` CHECK (((`grade` >= 0) and (`grade` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certifications`
--

LOCK TABLES `certifications` WRITE;
/*!40000 ALTER TABLE `certifications` DISABLE KEYS */;
INSERT INTO `certifications` VALUES (1,'French Baccalaureate','2023-06-30',75),(2,'TOEFL IBT','2022-06-22',85),(3,'Python Sololearn','2022-12-24',NULL),(4,'Java Sololearn','2023-11-01',NULL),(5,'HTML Sololearn','2022-04-07',NULL),(6,'SQL Sololearn','2024-10-13',NULL),(7,'Machine Learning Sololearn','2023-04-03',NULL);
/*!40000 ALTER TABLE `certifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `unique_comment_user` (`comment_id`,`user_id`),
  KEY `fk_comment_likes_user` (`user_id`),
  CONSTRAINT `fk_comment_likes_comment` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comments_post` (`post_id`),
  KEY `idx_comment_user` (`user_id`),
  CONSTRAINT `fk_comments_post` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(50) NOT NULL,
  `contact_value` varchar(255) NOT NULL,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'email','noam.favier@icloud.com'),(2,'phone','+33619773133'),(3,'address','Maastricht, Netherlands');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educations`
--

DROP TABLE IF EXISTS `educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations` (
  `education_id` int NOT NULL AUTO_INCREMENT,
  `school_name` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `field_of_study` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`education_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educations`
--

LOCK TABLES `educations` WRITE;
/*!40000 ALTER TABLE `educations` DISABLE KEYS */;
INSERT INTO `educations` VALUES (1,'Lycee Jeanne D\'arc','French Baccalaureate','Math, Physics, English','2020-09-01','2023-06-30'),(2,'Maastricht University','Bachelor of Science','Data Science and Artificial Intelligence','2023-09-01','2026-06-30');
/*!40000 ALTER TABLE `educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','init','SQL','V1__init.sql',-252769068,'root','2025-01-08 12:33:57',463,1),(2,'2','initial data','SQL','V2__initial_data.sql',438881478,'root','2025-01-08 12:33:57',11,1),(3,'3','images','SQL','V3__images.sql',-1605757488,'root','2025-01-08 12:33:57',3,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_images`
--

DROP TABLE IF EXISTS `framework_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `framework_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `framework_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `fk_framework_images_framework` (`framework_id`),
  CONSTRAINT `fk_framework_images_framework` FOREIGN KEY (`framework_id`) REFERENCES `frameworks` (`framework_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_images`
--

LOCK TABLES `framework_images` WRITE;
/*!40000 ALTER TABLE `framework_images` DISABLE KEYS */;
INSERT INTO `framework_images` VALUES (1,1,'https://cdn.simpleicons.org/spring',NULL,NULL,'2025-01-08 12:33:57'),(2,2,'https://cdn.simpleicons.org/hibernate',NULL,NULL,'2025-01-08 12:33:57'),(3,3,'https://cdn.simpleicons.org/lwjgl',NULL,NULL,'2025-01-08 12:33:57'),(4,4,'https://cdn.simpleicons.org/apachekafka',NULL,NULL,'2025-01-08 12:33:57'),(5,5,'https://cdn.simpleicons.org/maven',NULL,NULL,'2025-01-08 12:33:57'),(6,6,'https://cdn.simpleicons.org/gradle',NULL,NULL,'2025-01-08 12:33:57'),(7,7,'https://cdn.simpleicons.org/quarkus',NULL,NULL,'2025-01-08 12:33:57'),(8,8,'https://cdn.simpleicons.org/micronaut',NULL,NULL,'2025-01-08 12:33:57'),(9,9,'https://cdn.simpleicons.org/jersey',NULL,NULL,'2025-01-08 12:33:57'),(10,10,'https://cdn.simpleicons.org/javafx',NULL,NULL,'2025-01-08 12:33:57'),(11,11,'https://cdn.simpleicons.org/swing',NULL,NULL,'2025-01-08 12:33:57'),(12,12,'https://cdn.simpleicons.org/junit',NULL,NULL,'2025-01-08 12:33:57'),(13,13,'https://cdn.simpleicons.org/mockito',NULL,NULL,'2025-01-08 12:33:57'),(14,14,'https://cdn.simpleicons.org/flask',NULL,NULL,'2025-01-08 12:33:57'),(15,15,'https://cdn.simpleicons.org/django',NULL,NULL,'2025-01-08 12:33:57'),(16,16,'https://cdn.simpleicons.org/tkinter',NULL,NULL,'2025-01-08 12:33:57'),(17,17,'https://cdn.simpleicons.org/matplotlib',NULL,NULL,'2025-01-08 12:33:57'),(18,18,'https://cdn.simpleicons.org/scikit-learn',NULL,NULL,'2025-01-08 12:33:57'),(19,19,'https://cdn.simpleicons.org/pandas',NULL,NULL,'2025-01-08 12:33:57'),(20,20,'https://cdn.simpleicons.org/pytorch',NULL,NULL,'2025-01-08 12:33:57'),(21,21,'https://cdn.simpleicons.org/tensorflow',NULL,NULL,'2025-01-08 12:33:57'),(22,22,'https://cdn.simpleicons.org/fastapi',NULL,NULL,'2025-01-08 12:33:57'),(23,23,'https://cdn.simpleicons.org/numpy',NULL,NULL,'2025-01-08 12:33:57'),(24,24,'https://cdn.simpleicons.org/pydantic',NULL,NULL,'2025-01-08 12:33:57'),(25,25,'https://cdn.simpleicons.org/celery',NULL,NULL,'2025-01-08 12:33:57'),(26,26,'https://cdn.simpleicons.org/rocket',NULL,NULL,'2025-01-08 12:33:57'),(27,27,'https://cdn.simpleicons.org/tide',NULL,NULL,'2025-01-08 12:33:57'),(28,28,'https://cdn.simpleicons.org/actix',NULL,NULL,'2025-01-08 12:33:57'),(29,29,'https://cdn.simpleicons.org/tokio',NULL,NULL,'2025-01-08 12:33:57'),(30,30,'https://cdn.simpleicons.org/diesel',NULL,NULL,'2025-01-08 12:33:57'),(31,31,'https://cdn.simpleicons.org/serde',NULL,NULL,'2025-01-08 12:33:57'),(32,32,'https://cdn.simpleicons.org/hyper',NULL,NULL,'2025-01-08 12:33:57'),(33,33,'https://cdn.simpleicons.org/warp',NULL,NULL,'2025-01-08 12:33:57'),(34,34,'https://cdn.simpleicons.org/qt',NULL,NULL,'2025-01-08 12:33:57'),(35,35,'https://cdn.simpleicons.org/boost',NULL,NULL,'2025-01-08 12:33:57'),(36,36,'https://cdn.simpleicons.org/opengl',NULL,NULL,'2025-01-08 12:33:57'),(37,37,'https://cdn.simpleicons.org/poco',NULL,NULL,'2025-01-08 12:33:57'),(38,38,'https://cdn.simpleicons.org/boostasio',NULL,NULL,'2025-01-08 12:33:57'),(39,39,'https://cdn.simpleicons.org/swiftui',NULL,NULL,'2025-01-08 12:33:57'),(40,40,'https://cdn.simpleicons.org/vapor',NULL,NULL,'2025-01-08 12:33:57'),(41,41,'https://cdn.simpleicons.org/react',NULL,NULL,'2025-01-08 12:33:57'),(42,42,'https://cdn.simpleicons.org/vuejs',NULL,NULL,'2025-01-08 12:33:57'),(43,43,'https://cdn.simpleicons.org/nodejs',NULL,NULL,'2025-01-08 12:33:57'),(44,44,'https://cdn.simpleicons.org/expressjs',NULL,NULL,'2025-01-08 12:33:57'),(45,45,'https://cdn.simpleicons.org/angular',NULL,NULL,'2025-01-08 12:33:57'),(46,46,'https://cdn.simpleicons.org/svelte',NULL,NULL,'2025-01-08 12:33:57'),(47,47,'https://cdn.simpleicons.org/electron',NULL,NULL,'2025-01-08 12:33:57'),(48,48,'https://cdn.simpleicons.org/jest',NULL,NULL,'2025-01-08 12:33:57'),(49,49,'https://cdn.simpleicons.org/mocha',NULL,NULL,'2025-01-08 12:33:57'),(50,50,'https://cdn.simpleicons.org/nextjs',NULL,NULL,'2025-01-08 12:33:57'),(51,51,'https://cdn.simpleicons.org/gatsby',NULL,NULL,'2025-01-08 12:33:57'),(52,52,'https://cdn.simpleicons.org/tailwind',NULL,NULL,'2025-01-08 12:33:57'),(53,53,'https://cdn.simpleicons.org/bootstrap',NULL,NULL,'2025-01-08 12:33:57'),(54,54,'https://cdn.simpleicons.org/sass',NULL,NULL,'2025-01-08 12:33:57'),(55,55,'https://cdn.simpleicons.org/less',NULL,NULL,'2025-01-08 12:33:57'),(56,56,'https://cdn.simpleicons.org/gorm',NULL,NULL,'2025-01-08 12:33:57'),(57,57,'https://cdn.simpleicons.org/gin',NULL,NULL,'2025-01-08 12:33:57'),(58,58,'https://cdn.simpleicons.org/echo',NULL,NULL,'2025-01-08 12:33:57'),(59,59,'https://cdn.simpleicons.org/beego',NULL,NULL,'2025-01-08 12:33:57'),(60,60,'https://cdn.simpleicons.org/aspnet',NULL,NULL,'2025-01-08 12:33:57'),(61,61,'https://cdn.simpleicons.org/unity',NULL,NULL,'2025-01-08 12:33:57'),(62,62,'https://cdn.simpleicons.org/blazor',NULL,NULL,'2025-01-08 12:33:57'),(63,63,'https://cdn.simpleicons.org/entityframework',NULL,NULL,'2025-01-08 12:33:57'),(64,64,'https://cdn.simpleicons.org/rails',NULL,NULL,'2025-01-08 12:33:57'),(65,65,'https://cdn.simpleicons.org/sinatra',NULL,NULL,'2025-01-08 12:33:57'),(66,66,'https://cdn.simpleicons.org/laravel',NULL,NULL,'2025-01-08 12:33:57'),(67,67,'https://cdn.simpleicons.org/symfony',NULL,NULL,'2025-01-08 12:33:57'),(68,68,'https://cdn.simpleicons.org/zend',NULL,NULL,'2025-01-08 12:33:57'),(69,69,'https://cdn.simpleicons.org/phoenix',NULL,NULL,'2025-01-08 12:33:57'),(70,70,'https://cdn.simpleicons.org/ktor',NULL,NULL,'2025-01-08 12:33:57'),(71,71,'https://cdn.simpleicons.org/exposed',NULL,NULL,'2025-01-08 12:33:57'),(72,72,'https://cdn.simpleicons.org/play',NULL,NULL,'2025-01-08 12:33:57'),(73,73,'https://cdn.simpleicons.org/akka',NULL,NULL,'2025-01-08 12:33:57'),(74,74,'https://cdn.simpleicons.org/yesod',NULL,NULL,'2025-01-08 12:33:57'),(75,75,'https://cdn.simpleicons.org/shiny',NULL,NULL,'2025-01-08 12:33:57'),(76,76,'https://cdn.simpleicons.org/ggplot2',NULL,NULL,'2025-01-08 12:33:57'),(77,77,'https://cdn.simpleicons.org/sqlalchemy',NULL,NULL,'2025-01-08 12:33:57'),(78,78,'https://cdn.simpleicons.org/flyway',NULL,NULL,'2025-01-08 12:33:57'),(79,79,'https://cdn.simpleicons.org/liquibase',NULL,NULL,'2025-01-08 12:33:57'),(80,80,'https://cdn.simpleicons.org/bash',NULL,NULL,'2025-01-08 12:33:57'),(81,81,'https://cdn.simpleicons.org/powershell',NULL,NULL,'2025-01-08 12:33:57'),(82,82,'https://cdn.simpleicons.org/flux',NULL,NULL,'2025-01-08 12:33:57'),(83,83,'https://cdn.simpleicons.org/flutter',NULL,NULL,'2025-01-08 12:33:57'),(84,84,'https://cdn.simpleicons.org/love2d',NULL,NULL,'2025-01-08 12:33:57'),(85,85,'https://cdn.simpleicons.org/clasp',NULL,NULL,'2025-01-08 12:33:57');
/*!40000 ALTER TABLE `framework_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `framework_roadmaps`
--

DROP TABLE IF EXISTS `framework_roadmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `framework_roadmaps` (
  `roadmap_id` int NOT NULL,
  `framework_id` int NOT NULL,
  PRIMARY KEY (`roadmap_id`,`framework_id`),
  KEY `idx_framework_roadmap_framework` (`framework_id`),
  CONSTRAINT `fk_framework_roadmaps_framework` FOREIGN KEY (`framework_id`) REFERENCES `frameworks` (`framework_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_framework_roadmaps_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `framework_roadmaps`
--

LOCK TABLES `framework_roadmaps` WRITE;
/*!40000 ALTER TABLE `framework_roadmaps` DISABLE KEYS */;
INSERT INTO `framework_roadmaps` VALUES (4,1),(4,2),(4,3),(4,4),(4,5),(4,6),(4,7),(4,8),(4,9),(4,10),(4,11),(4,12),(4,13),(4,14),(4,15),(4,16),(4,17),(4,18),(4,19),(4,20),(4,21),(4,22),(4,23),(4,24),(4,25),(4,26),(4,27),(4,28),(4,29),(4,30),(4,31),(4,32),(4,33),(4,34),(4,35),(4,36),(4,37),(4,38),(4,39),(4,40),(4,41),(4,42),(4,43),(4,44),(4,45),(4,46),(4,47),(4,48),(4,49),(4,50),(4,51),(4,52),(4,53),(4,54),(4,55),(4,56),(4,57),(4,58),(4,59),(4,60),(4,61),(4,62),(4,63),(4,64),(4,65),(4,66),(4,67),(4,68),(4,69),(4,70),(4,71),(4,72),(4,73),(4,74),(4,75),(4,76),(4,77),(4,78),(4,79),(4,80),(4,81),(4,82),(4,83),(4,84),(4,85);
/*!40000 ALTER TABLE `framework_roadmaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frameworks`
--

DROP TABLE IF EXISTS `frameworks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frameworks` (
  `framework_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `percentage` float NOT NULL,
  `favorite` tinyint(1) DEFAULT '0',
  `learning` tinyint(1) DEFAULT '0',
  `language_id` int DEFAULT NULL,
  PRIMARY KEY (`framework_id`),
  UNIQUE KEY `name` (`name`),
  KEY `fk_frameworks_language` (`language_id`),
  CONSTRAINT `fk_frameworks_language` FOREIGN KEY (`language_id`) REFERENCES `programming_languages` (`language_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `frameworks_chk_1` CHECK (((`percentage` >= 0) and (`percentage` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frameworks`
--

LOCK TABLES `frameworks` WRITE;
/*!40000 ALTER TABLE `frameworks` DISABLE KEYS */;
INSERT INTO `frameworks` VALUES (1,'Spring',90,1,0,1),(2,'Hibernate',0,0,0,1),(3,'LWJGL',80,1,1,1),(4,'Apache Kafka',40,0,0,1),(5,'Maven',80,1,1,1),(6,'Gradle',50,0,0,1),(7,'Quarkus',0,0,0,1),(8,'Micronaut',0,0,0,1),(9,'Jersey',0,0,0,1),(10,'JavaFX',90,1,0,1),(11,'Swing',70,0,0,1),(12,'JUnit',0,0,0,1),(13,'Mockito',0,0,0,1),(14,'Flask',70,0,0,2),(15,'Django',30,0,0,2),(16,'Tkinter',60,0,1,2),(17,'Matplotlib',90,0,1,2),(18,'Scikit-learn',60,1,1,2),(19,'Pandas',80,1,0,2),(20,'PyTorch',50,1,1,2),(21,'TensorFlow',60,0,1,2),(22,'FastAPI',60,0,0,2),(23,'NumPy',85,1,1,2),(24,'Pydantic',0,0,0,2),(25,'Celery',0,0,0,2),(26,'Rocket',0,0,0,3),(27,'Tide',0,0,0,3),(28,'Actix',30,0,0,3),(29,'Tokio',20,0,0,3),(30,'Diesel',60,0,1,3),(31,'Serde',0,0,0,3),(32,'Hyper',0,0,0,3),(33,'Warp',0,0,0,3),(34,'Qt',0,0,0,4),(35,'Boost',0,0,0,4),(36,'OpenGL',60,1,0,4),(37,'Poco',0,0,0,4),(38,'Boost.Asio',0,0,0,4),(39,'SwiftUI',60,1,1,5),(40,'Vapor',0,0,0,5),(41,'React',80,1,1,7),(42,'Vue.js',0,0,0,7),(43,'Node.js',70,1,1,7),(44,'Express.js',0,0,0,7),(45,'Angular',0,0,0,7),(46,'Svelte',0,0,0,7),(47,'Electron',0,0,0,7),(48,'Jest',0,0,0,7),(49,'Mocha',0,0,0,7),(50,'Next.js',0,0,0,8),(51,'Gatsby',0,0,0,8),(52,'Tailwind',30,1,1,9),(53,'Bootstrap',0,0,0,9),(54,'Sass',0,0,0,9),(55,'Less',0,0,0,9),(56,'GORM',0,0,0,11),(57,'Gin',0,0,0,11),(58,'Echo',0,0,0,11),(59,'Beego',0,0,0,11),(60,'ASP.NET',0,0,0,12),(61,'Unity',80,1,1,12),(62,'Blazor',0,0,0,12),(63,'Entity Framework',0,0,0,12),(64,'Rails',0,0,0,16),(65,'Sinatra',0,0,0,16),(66,'Laravel',0,0,0,15),(67,'Symfony',0,0,0,15),(68,'Zend',0,0,0,15),(69,'Phoenix',0,0,0,31),(70,'Ktor',0,0,0,14),(71,'Exposed',0,0,0,14),(72,'Play',0,0,0,18),(73,'Akka',0,0,0,18),(74,'Yesod',0,0,0,19),(75,'Shiny',0,0,0,20),(76,'ggplot2',0,0,0,20),(77,'SQLAlchemy',50,0,0,10),(78,'Flyway',70,0,1,10),(79,'Liquibase',0,0,0,10),(80,'Bash',60,1,1,25),(81,'Powershell',40,0,1,27),(82,'Flux',0,0,0,22),(83,'Flutter',0,0,0,23),(84,'Love2D',0,0,0,13),(85,'CLASP',0,0,0,43);
/*!40000 ALTER TABLE `frameworks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `git_updates`
--

DROP TABLE IF EXISTS `git_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `git_updates` (
  `update_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `commit_hash` varchar(40) NOT NULL,
  `message` text NOT NULL,
  `is_commit` tinyint(1) DEFAULT '1',
  `is_pull_request` tinyint(1) DEFAULT '0',
  `is_issue` tinyint(1) DEFAULT '0',
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`update_id`),
  KEY `fk_git_updates_project` (`project_id`),
  CONSTRAINT `fk_git_updates_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `git_updates`
--

LOCK TABLES `git_updates` WRITE;
/*!40000 ALTER TABLE `git_updates` DISABLE KEYS */;
/*!40000 ALTER TABLE `git_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `fk_likes_user` (`user_id`),
  KEY `idx_like_post` (`post_id`),
  CONSTRAINT `fk_likes_post` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestones`
--

DROP TABLE IF EXISTS `milestones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestones` (
  `milestone_id` int NOT NULL AUTO_INCREMENT,
  `roadmap_id` int NOT NULL,
  `milestone_title` varchar(255) NOT NULL,
  `milestone_description` text,
  `milestone_link` varchar(255) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`milestone_id`),
  KEY `idx_milestone_roadmap` (`roadmap_id`),
  CONSTRAINT `fk_milestones_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestones`
--

LOCK TABLES `milestones` WRITE;
/*!40000 ALTER TABLE `milestones` DISABLE KEYS */;
INSERT INTO `milestones` VALUES (1,1,'Understand the Basics','Learn the syntax and basic constructs of the language',NULL,0,'2025-01-08 12:33:57'),(2,1,'Advanced Features','Dive into advanced topics and language features',NULL,0,'2025-01-08 12:33:57'),(3,1,'Build a Project','Create a project using the language',NULL,0,'2025-01-08 12:33:57'),(4,1,'Contribute to Open Source','Contribute to open-source projects in this language',NULL,0,'2025-01-08 12:33:57'),(5,1,'Achieve Mastery','Become an expert in the language',NULL,0,'2025-01-08 12:33:57'),(6,2,'Assess Current Level','Evaluate your current skill level',NULL,0,'2025-01-08 12:33:57'),(7,2,'Set Improvement Goals','Define specific goals to improve the skill',NULL,0,'2025-01-08 12:33:57'),(8,2,'Practice Regularly','Engage in regular practice',NULL,0,'2025-01-08 12:33:57'),(9,2,'Seek Feedback','Get feedback from peers or mentors',NULL,0,'2025-01-08 12:33:57'),(10,2,'Achieve Proficiency','Reach a high level of proficiency',NULL,0,'2025-01-08 12:33:57'),(11,3,'Install and Configure','Set up the tool in your environment',NULL,0,'2025-01-08 12:33:57'),(12,3,'Basic Usage','Understand basic commands and operations',NULL,0,'2025-01-08 12:33:57'),(13,3,'Advanced Features','Learn advanced functionalities',NULL,0,'2025-01-08 12:33:57'),(14,3,'Integrate into Workflow','Incorporate the tool into your regular workflow',NULL,0,'2025-01-08 12:33:57'),(15,3,'Optimize Usage','Use the tool more efficiently',NULL,0,'2025-01-08 12:33:57'),(16,4,'Setup Environment','Install and configure the framework',NULL,0,'2025-01-08 12:33:57'),(17,4,'Simple Application','Create a basic app using the framework',NULL,0,'2025-01-08 12:33:57'),(18,4,'Best Practices','Study best practices and design patterns',NULL,0,'2025-01-08 12:33:57'),(19,4,'Complex Applications','Build more complex applications',NULL,0,'2025-01-08 12:33:57'),(20,4,'Master the Framework','Gain deep understanding and expertise',NULL,0,'2025-01-08 12:33:57');
/*!40000 ALTER TABLE `milestones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programming_language_images`
--

DROP TABLE IF EXISTS `programming_language_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programming_language_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `language_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `fk_programming_language_images_language` (`language_id`),
  CONSTRAINT `fk_programming_language_images_language` FOREIGN KEY (`language_id`) REFERENCES `programming_languages` (`language_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programming_language_images`
--

LOCK TABLES `programming_language_images` WRITE;
/*!40000 ALTER TABLE `programming_language_images` DISABLE KEYS */;
INSERT INTO `programming_language_images` VALUES (1,1,'https://cdn.simpleicons.org/java',NULL,NULL,'2025-01-08 12:33:57'),(2,2,'https://cdn.simpleicons.org/python',NULL,NULL,'2025-01-08 12:33:57'),(3,3,'https://cdn.simpleicons.org/rust',NULL,NULL,'2025-01-08 12:33:57'),(4,4,'https://cdn.simpleicons.org/c++',NULL,NULL,'2025-01-08 12:33:57'),(5,5,'https://cdn.simpleicons.org/swift',NULL,NULL,'2025-01-08 12:33:57'),(6,6,'https://cdn.simpleicons.org/c',NULL,NULL,'2025-01-08 12:33:57'),(7,7,'https://cdn.simpleicons.org/javascript',NULL,NULL,'2025-01-08 12:33:57'),(8,8,'https://cdn.simpleicons.org/typescript',NULL,NULL,'2025-01-08 12:33:57'),(9,9,'https://cdn.simpleicons.org/htmlcss',NULL,NULL,'2025-01-08 12:33:57'),(10,10,'https://cdn.simpleicons.org/sql',NULL,NULL,'2025-01-08 12:33:57'),(11,11,'https://cdn.simpleicons.org/go',NULL,NULL,'2025-01-08 12:33:57'),(12,12,'https://cdn.simpleicons.org/c#',NULL,NULL,'2025-01-08 12:33:57'),(13,13,'https://cdn.simpleicons.org/lua',NULL,NULL,'2025-01-08 12:33:57'),(14,14,'https://cdn.simpleicons.org/kotlin',NULL,NULL,'2025-01-08 12:33:57'),(15,15,'https://cdn.simpleicons.org/php',NULL,NULL,'2025-01-08 12:33:57'),(16,16,'https://cdn.simpleicons.org/ruby',NULL,NULL,'2025-01-08 12:33:57'),(17,17,'https://cdn.simpleicons.org/perl',NULL,NULL,'2025-01-08 12:33:57'),(18,18,'https://cdn.simpleicons.org/scala',NULL,NULL,'2025-01-08 12:33:57'),(19,19,'https://cdn.simpleicons.org/haskell',NULL,NULL,'2025-01-08 12:33:57'),(20,20,'https://cdn.simpleicons.org/r',NULL,NULL,'2025-01-08 12:33:57'),(21,21,'https://cdn.simpleicons.org/matlab',NULL,NULL,'2025-01-08 12:33:57'),(22,22,'https://cdn.simpleicons.org/julia',NULL,NULL,'2025-01-08 12:33:57'),(23,23,'https://cdn.simpleicons.org/dart',NULL,NULL,'2025-01-08 12:33:57'),(24,24,'https://cdn.simpleicons.org/objective-c',NULL,NULL,'2025-01-08 12:33:57'),(25,25,'https://cdn.simpleicons.org/shell',NULL,NULL,'2025-01-08 12:33:57'),(26,26,'https://cdn.simpleicons.org/bash',NULL,NULL,'2025-01-08 12:33:57'),(27,27,'https://cdn.simpleicons.org/powershell',NULL,NULL,'2025-01-08 12:33:57'),(28,28,'https://cdn.simpleicons.org/vimscript',NULL,NULL,'2025-01-08 12:33:57'),(29,29,'https://cdn.simpleicons.org/groovy',NULL,NULL,'2025-01-08 12:33:57'),(30,30,'https://cdn.simpleicons.org/erlang',NULL,NULL,'2025-01-08 12:33:57'),(31,31,'https://cdn.simpleicons.org/elixir',NULL,NULL,'2025-01-08 12:33:57'),(32,32,'https://cdn.simpleicons.org/f#',NULL,NULL,'2025-01-08 12:33:57'),(33,33,'https://cdn.simpleicons.org/fortran',NULL,NULL,'2025-01-08 12:33:57'),(34,34,'https://cdn.simpleicons.org/cobol',NULL,NULL,'2025-01-08 12:33:57'),(35,35,'https://cdn.simpleicons.org/pascal',NULL,NULL,'2025-01-08 12:33:57'),(36,36,'https://cdn.simpleicons.org/zig',NULL,NULL,'2025-01-08 12:33:57'),(37,37,'https://cdn.simpleicons.org/assembly',NULL,NULL,'2025-01-08 12:33:57'),(38,38,'https://cdn.simpleicons.org/crystal',NULL,NULL,'2025-01-08 12:33:57'),(39,39,'https://cdn.simpleicons.org/nim',NULL,NULL,'2025-01-08 12:33:57'),(40,40,'https://cdn.simpleicons.org/d',NULL,NULL,'2025-01-08 12:33:57'),(41,41,'https://cdn.simpleicons.org/ada',NULL,NULL,'2025-01-08 12:33:57'),(42,42,'https://cdn.simpleicons.org/scheme',NULL,NULL,'2025-01-08 12:33:57'),(43,43,'https://cdn.simpleicons.org/lisp',NULL,NULL,'2025-01-08 12:33:57'),(44,44,'https://cdn.simpleicons.org/prolog',NULL,NULL,'2025-01-08 12:33:57'),(45,45,'https://cdn.simpleicons.org/smalltalk',NULL,NULL,'2025-01-08 12:33:57'),(46,46,'https://cdn.simpleicons.org/dylan',NULL,NULL,'2025-01-08 12:33:57'),(47,47,'https://cdn.simpleicons.org/eiffel',NULL,NULL,'2025-01-08 12:33:57'),(48,48,'https://cdn.simpleicons.org/tcl',NULL,NULL,'2025-01-08 12:33:57'),(49,49,'https://cdn.simpleicons.org/forth',NULL,NULL,'2025-01-08 12:33:57'),(50,50,'https://cdn.simpleicons.org/apl',NULL,NULL,'2025-01-08 12:33:57'),(51,51,'https://cdn.simpleicons.org/logo',NULL,NULL,'2025-01-08 12:33:57'),(52,52,'https://cdn.simpleicons.org/rexx',NULL,NULL,'2025-01-08 12:33:57'),(53,53,'https://cdn.simpleicons.org/awk',NULL,NULL,'2025-01-08 12:33:57'),(54,54,'https://cdn.simpleicons.org/sed',NULL,NULL,'2025-01-08 12:33:57'),(55,55,'https://cdn.simpleicons.org/mumps',NULL,NULL,'2025-01-08 12:33:57'),(56,56,'https://cdn.simpleicons.org/j',NULL,NULL,'2025-01-08 12:33:57'),(57,57,'https://cdn.simpleicons.org/k',NULL,NULL,'2025-01-08 12:33:57'),(58,58,'https://cdn.simpleicons.org/visualbasic',NULL,NULL,'2025-01-08 12:33:57'),(59,59,'https://cdn.simpleicons.org/rpg',NULL,NULL,'2025-01-08 12:33:57'),(60,60,'https://cdn.simpleicons.org/v',NULL,NULL,'2025-01-08 12:33:57'),(61,61,'https://cdn.simpleicons.org/turing',NULL,NULL,'2025-01-08 12:33:57'),(62,62,'https://cdn.simpleicons.org/actionscript',NULL,NULL,'2025-01-08 12:33:57'),(63,63,'https://cdn.simpleicons.org/coldfusion',NULL,NULL,'2025-01-08 12:33:57'),(64,64,'https://cdn.simpleicons.org/ocaml',NULL,NULL,'2025-01-08 12:33:57');
/*!40000 ALTER TABLE `programming_language_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programming_language_roadmaps`
--

DROP TABLE IF EXISTS `programming_language_roadmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programming_language_roadmaps` (
  `roadmap_id` int NOT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`roadmap_id`,`language_id`),
  KEY `idx_plr_language_roadmap_language` (`language_id`),
  CONSTRAINT `fk_plr_language` FOREIGN KEY (`language_id`) REFERENCES `programming_languages` (`language_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_plr_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programming_language_roadmaps`
--

LOCK TABLES `programming_language_roadmaps` WRITE;
/*!40000 ALTER TABLE `programming_language_roadmaps` DISABLE KEYS */;
INSERT INTO `programming_language_roadmaps` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,45),(1,46),(1,47),(1,48),(1,49),(1,50),(1,51),(1,52),(1,53),(1,54),(1,55),(1,56),(1,57),(1,58),(1,59),(1,60),(1,61),(1,62),(1,63),(1,64);
/*!40000 ALTER TABLE `programming_language_roadmaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programming_languages`
--

DROP TABLE IF EXISTS `programming_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programming_languages` (
  `language_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `percentage` float NOT NULL,
  `favorite` tinyint(1) DEFAULT '0',
  `learning` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`language_id`),
  UNIQUE KEY `name` (`name`),
  CONSTRAINT `programming_languages_chk_1` CHECK (((`percentage` >= 0) and (`percentage` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programming_languages`
--

LOCK TABLES `programming_languages` WRITE;
/*!40000 ALTER TABLE `programming_languages` DISABLE KEYS */;
INSERT INTO `programming_languages` VALUES (1,'Java',90,1,0),(2,'Python',70,0,0),(3,'Rust',50,1,1),(4,'C++',30,1,1),(5,'Swift',20,0,1),(6,'C',70,0,0),(7,'Javascript',60,0,1),(8,'Typescript',50,1,0),(9,'HTML/CSS',90,0,0),(10,'SQL',50,0,1),(11,'Go',0,1,0),(12,'C#',40,0,0),(13,'Lua',60,1,1),(14,'Kotlin',20,0,0),(15,'PHP',20,0,0),(16,'Ruby',20,0,0),(17,'Perl',10,0,0),(18,'Scala',10,0,0),(19,'Haskell',10,0,0),(20,'R',20,0,0),(21,'Matlab',40,0,0),(22,'Julia',10,0,0),(23,'Dart',10,0,0),(24,'Objective-C',10,0,0),(25,'Shell',30,0,1),(26,'Bash',60,0,1),(27,'Powershell',20,0,1),(28,'Vimscript',40,0,1),(29,'Groovy',0,0,0),(30,'Erlang',0,0,0),(31,'Elixir',0,0,0),(32,'F#',0,0,0),(33,'Fortran',0,0,0),(34,'COBOL',0,0,0),(35,'Pascal',0,0,0),(36,'Zig',0,0,0),(37,'Assembly',0,0,0),(38,'Crystal',0,0,0),(39,'Nim',0,0,0),(40,'D',0,0,0),(41,'Ada',0,0,0),(42,'Scheme',0,0,0),(43,'Lisp',0,0,0),(44,'Prolog',0,0,0),(45,'Smalltalk',0,0,0),(46,'Dylan',0,0,0),(47,'Eiffel',0,0,0),(48,'Tcl',0,0,0),(49,'Forth',0,0,0),(50,'APL',0,0,0),(51,'Logo',0,0,0),(52,'Rexx',0,0,0),(53,'Awk',0,0,0),(54,'Sed',0,0,0),(55,'MUMPS',0,0,0),(56,'J',0,0,0),(57,'K',0,0,0),(58,'Visual Basic',0,0,0),(59,'RPG',0,0,0),(60,'V',0,0,0),(61,'Turing',0,0,0),(62,'ActionScript',0,0,0),(63,'ColdFusion',0,0,0),(64,'OCaml',0,0,0);
/*!40000 ALTER TABLE `programming_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_comment_likes`
--

DROP TABLE IF EXISTS `project_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_comment_likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `unique_project_comment_user` (`comment_id`,`user_id`),
  KEY `fk_project_comment_likes_user` (`user_id`),
  CONSTRAINT `fk_project_comment_likes_comment` FOREIGN KEY (`comment_id`) REFERENCES `project_comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_comment_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_comment_likes`
--

LOCK TABLES `project_comment_likes` WRITE;
/*!40000 ALTER TABLE `project_comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_comments`
--

DROP TABLE IF EXISTS `project_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_project_comments_project` (`project_id`),
  KEY `fk_project_comments_user` (`user_id`),
  CONSTRAINT `fk_project_comments_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_comments`
--

LOCK TABLES `project_comments` WRITE;
/*!40000 ALTER TABLE `project_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_contributors`
--

DROP TABLE IF EXISTS `project_contributors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_contributors` (
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`user_id`),
  KEY `idx_project_contributors_user` (`user_id`),
  CONSTRAINT `fk_project_contributors_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_contributors_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_contributors`
--

LOCK TABLES `project_contributors` WRITE;
/*!40000 ALTER TABLE `project_contributors` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_contributors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_frameworks`
--

DROP TABLE IF EXISTS `project_frameworks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_frameworks` (
  `project_id` int NOT NULL,
  `framework_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`framework_id`),
  KEY `fk_project_frameworks_framework` (`framework_id`),
  CONSTRAINT `fk_project_frameworks_framework` FOREIGN KEY (`framework_id`) REFERENCES `frameworks` (`framework_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_frameworks_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_frameworks`
--

LOCK TABLES `project_frameworks` WRITE;
/*!40000 ALTER TABLE `project_frameworks` DISABLE KEYS */;
INSERT INTO `project_frameworks` VALUES (2,3),(2,5),(4,11),(3,14),(1,30),(7,39),(10,39),(1,41),(3,41),(1,52),(3,52),(3,77);
/*!40000 ALTER TABLE `project_frameworks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `fk_project_images` (`project_id`),
  CONSTRAINT `fk_project_images` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_languages`
--

DROP TABLE IF EXISTS `project_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_languages` (
  `project_id` int NOT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`language_id`),
  KEY `fk_project_languages_language` (`language_id`),
  CONSTRAINT `fk_project_languages_language` FOREIGN KEY (`language_id`) REFERENCES `programming_languages` (`language_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_languages_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_languages`
--

LOCK TABLES `project_languages` WRITE;
/*!40000 ALTER TABLE `project_languages` DISABLE KEYS */;
INSERT INTO `project_languages` VALUES (2,1),(4,1),(3,2),(1,3),(6,3),(7,5),(9,5),(10,5),(1,7),(3,7),(1,9),(3,9),(3,10),(5,13),(8,13),(1,26),(3,26),(5,28),(8,28);
/*!40000 ALTER TABLE `project_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_likes`
--

DROP TABLE IF EXISTS `project_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `unique_project_user` (`project_id`,`user_id`),
  KEY `fk_project_likes_user` (`user_id`),
  CONSTRAINT `fk_project_likes_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_likes`
--

LOCK TABLES `project_likes` WRITE;
/*!40000 ALTER TABLE `project_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_links`
--

DROP TABLE IF EXISTS `project_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_links` (
  `link_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `link_name` varchar(50) NOT NULL,
  `link_url` varchar(255) NOT NULL,
  PRIMARY KEY (`link_id`),
  KEY `fk_project_links_project` (`project_id`),
  CONSTRAINT `fk_project_links_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_links`
--

LOCK TABLES `project_links` WRITE;
/*!40000 ALTER TABLE `project_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_roadmaps`
--

DROP TABLE IF EXISTS `project_roadmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_roadmaps` (
  `roadmap_id` int NOT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`roadmap_id`,`project_id`),
  KEY `fk_project_roadmaps_project` (`project_id`),
  CONSTRAINT `fk_project_roadmaps_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_roadmaps_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_roadmaps`
--

LOCK TABLES `project_roadmaps` WRITE;
/*!40000 ALTER TABLE `project_roadmaps` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_roadmaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_tags`
--

DROP TABLE IF EXISTS `project_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `tag_name` varchar(50) NOT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `fk_project_tags_project` (`project_id`),
  CONSTRAINT `fk_project_tags_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_tags`
--

LOCK TABLES `project_tags` WRITE;
/*!40000 ALTER TABLE `project_tags` DISABLE KEYS */;
INSERT INTO `project_tags` VALUES (1,1,'Web Development'),(2,1,'React-based'),(3,1,'Rust backend'),(4,1,'Tailwind CSS'),(5,1,'Databases'),(6,1,'ORM'),(7,2,'Game Development'),(8,2,'Java'),(9,2,'3D'),(10,2,'Physics'),(11,2,'Bots AI'),(12,3,'Web Development'),(13,3,'Flask'),(14,3,'SQLAlchemy'),(15,3,'Databases'),(16,3,'Tailwind CSS'),(17,3,'ORM'),(18,4,'Game Development'),(19,4,'Java'),(20,4,'Text-based'),(21,4,'Puzzle'),(22,4,'Rogue-like'),(23,5,'Vim'),(24,5,'Neovim'),(25,5,'IDE'),(26,6,'Game Development'),(27,6,'Chess'),(28,6,'AI'),(29,7,'App Development'),(30,7,'Learning'),(31,8,'Vim'),(32,8,'Neovim'),(33,8,'Theme'),(34,8,'Lualine'),(35,9,'App Development'),(36,9,'Personal Assistant'),(37,9,'macOS'),(38,10,'App Development'),(39,10,'Pathfinding'),(40,10,'Destination');
/*!40000 ALTER TABLE `project_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_tools`
--

DROP TABLE IF EXISTS `project_tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_tools` (
  `project_id` int NOT NULL,
  `tools_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`tools_id`),
  KEY `fk_project_tools_tools` (`tools_id`),
  CONSTRAINT `fk_project_tools_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_tools_tools` FOREIGN KEY (`tools_id`) REFERENCES `tools` (`tools_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_tools`
--

LOCK TABLES `project_tools` WRITE;
/*!40000 ALTER TABLE `project_tools` DISABLE KEYS */;
INSERT INTO `project_tools` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(1,2),(1,7),(3,7),(1,24),(3,24);
/*!40000 ALTER TABLE `project_tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `git_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Resume','My resume website','https://github.com/NoamFav/Resume','2024-07-12 00:00:00','2024-10-23 00:00:00'),(2,'Pot_Pot_Golf','A mini-golf game in java','https://github.com/NoamFav/Pot_Pot_Golf','2024-03-15 00:00:00','2024-10-13 00:00:00'),(3,'QueryCrust','A pizzaria website with databases','https://github.com/NoamFav/QueryCrust','2024-09-15 00:00:00','2024-10-16 00:00:00'),(4,'Shadowed Hunter','A 2D puzzle, rogue like, text based game','https://github.com/NoamFav/ShadowedHunter','2023-12-25 00:00:00','2024-10-20 00:00:00'),(5,'Neovim Config','My neovim configuration','https://github.com/NoamFav/Nvim-config','2024-09-19 00:00:00','2024-10-18 00:00:00'),(6,'Chess Bot','A chess bot in rust','https://github.com/NoamFav/chess-bot','2024-09-02 00:00:00','2024-10-08 00:00:00'),(7,'PyNexus','An app in swift for learning Python (on hold)','https://github.com/NoamFav/PyNexus','2024-09-03 00:00:00','2024-09-17 00:00:00'),(8,'2077.nvim','Forked from 2077 theme, upgraded with lualine','https://github.com/NoamFav/2077.nvim','2024-09-07 00:00:00','2024-09-17 00:00:00'),(9,'Jarvis','Creating a personal assistant for macOS, in swift','https://github.com/NoamFav/daddy-s-home','2024-09-23 00:00:00','2024-10-04 00:00:00'),(10,'Mock-carpool','A basic destination app with pathfinding','https://github.com/NoamFav/Mock-Carpool','2024-09-06 00:00:00','2024-09-17 00:00:00');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap_events`
--

DROP TABLE IF EXISTS `roadmap_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap_events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `roadmap_id` int NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `event_description` text,
  `event_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `event_type` varchar(50) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `fk_roadmap_events_roadmap` (`roadmap_id`),
  CONSTRAINT `fk_roadmap_events_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_events`
--

LOCK TABLES `roadmap_events` WRITE;
/*!40000 ALTER TABLE `roadmap_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `roadmap_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap_progress`
--

DROP TABLE IF EXISTS `roadmap_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap_progress` (
  `progress_id` int NOT NULL AUTO_INCREMENT,
  `roadmap_id` int NOT NULL,
  `progress_percentage` float NOT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`progress_id`),
  KEY `fk_roadmap_progress_roadmap` (`roadmap_id`),
  CONSTRAINT `fk_roadmap_progress_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roadmap_progress_chk_1` CHECK (((`progress_percentage` >= 0) and (`progress_percentage` <= 100)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_progress`
--

LOCK TABLES `roadmap_progress` WRITE;
/*!40000 ALTER TABLE `roadmap_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `roadmap_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmaps`
--

DROP TABLE IF EXISTS `roadmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmaps` (
  `roadmap_id` int NOT NULL AUTO_INCREMENT,
  `roadmap_title` varchar(255) NOT NULL,
  `roadmap_description` text,
  PRIMARY KEY (`roadmap_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmaps`
--

LOCK TABLES `roadmaps` WRITE;
/*!40000 ALTER TABLE `roadmaps` DISABLE KEYS */;
INSERT INTO `roadmaps` VALUES (1,'Programming Language Roadmap','Roadmap for mastering programming languages'),(2,'Skills Roadmap','Roadmap for improving skills'),(3,'Tools Roadmap','Roadmap for mastering tools'),(4,'Frameworks Roadmap','Roadmap for mastering frameworks');
/*!40000 ALTER TABLE `roadmaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_roadmaps`
--

DROP TABLE IF EXISTS `skill_roadmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_roadmaps` (
  `roadmap_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`roadmap_id`,`skill_id`),
  KEY `idx_skill_roadmap_skill` (`skill_id`),
  CONSTRAINT `fk_skill_roadmaps_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_roadmaps_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_roadmaps`
--

LOCK TABLES `skill_roadmaps` WRITE;
/*!40000 ALTER TABLE `skill_roadmaps` DISABLE KEYS */;
INSERT INTO `skill_roadmaps` VALUES (2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,10),(2,11),(2,12),(2,13),(2,14),(2,15),(2,16),(2,17),(2,18),(2,19),(2,20),(2,21),(2,22),(2,23),(2,24),(2,25);
/*!40000 ALTER TABLE `skill_roadmaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `skill_id` int NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(50) NOT NULL,
  `skill_percentage` float NOT NULL,
  PRIMARY KEY (`skill_id`),
  CONSTRAINT `skills_chk_1` CHECK (((`skill_percentage` >= 0) and (`skill_percentage` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Programming',80),(2,'Data Analysis',70),(3,'Machine Learning',60),(4,'Web Development',50),(5,'DevOps',40),(6,'Networking',40),(7,'Databases',70),(8,'Software Engineering',80),(9,'Team Management',70),(10,'Project Management',60),(11,'Problem Solving',80),(12,'Communication',70),(13,'Creativity',60),(14,'Algorithms',80),(15,'Data Structures',80),(16,'Statistics',70),(17,'Mathematics',70),(18,'Physics',60),(19,'Business Development',50),(20,'Product Management',50),(21,'Design',40),(22,'UX/UI',40),(23,'Writing',40),(24,'Public Speaking',80),(25,'Languages',90);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socials`
--

DROP TABLE IF EXISTS `socials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socials` (
  `social_id` int NOT NULL AUTO_INCREMENT,
  `social_name` varchar(50) NOT NULL,
  `social_url` varchar(255) NOT NULL,
  PRIMARY KEY (`social_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socials`
--

LOCK TABLES `socials` WRITE;
/*!40000 ALTER TABLE `socials` DISABLE KEYS */;
INSERT INTO `socials` VALUES (1,'instagram','https://www.instagram.com/noam_fvr/?utm_source=ig_web_button_share_sheet'),(2,'linkedin','www.linkedin.com/in/noam-favier-5461b7297'),(3,'github','https://github.com/NoamFav'),(4,'leetcode','https://leetcode.com/u/letraceur/');
/*!40000 ALTER TABLE `socials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools`
--

DROP TABLE IF EXISTS `tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tools` (
  `tools_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `percentage` float NOT NULL,
  `favorite` tinyint(1) NOT NULL,
  `learning` tinyint(1) NOT NULL,
  PRIMARY KEY (`tools_id`),
  CONSTRAINT `tools_chk_1` CHECK (((`percentage` >= 0) and (`percentage` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools`
--

LOCK TABLES `tools` WRITE;
/*!40000 ALTER TABLE `tools` DISABLE KEYS */;
INSERT INTO `tools` VALUES (1,'Git',90,1,1),(2,'Docker',70,0,1),(3,'Kubernetes',0,0,1),(4,'Jenkins',0,0,0),(5,'Travis CI',0,0,0),(6,'Circle CI',0,0,0),(7,'Github Actions',40,0,0),(8,'Jira',0,0,0),(9,'Confluence',0,0,0),(10,'Trello',0,0,0),(11,'Slack',0,0,0),(12,'Postman',0,0,0),(13,'Insomnia',0,0,0),(14,'Swagger',0,0,0),(15,'Kibana',0,0,0),(16,'Grafana',0,0,0),(17,'Prometheus',0,0,0),(18,'Elasticsearch',0,0,0),(19,'Logstash',0,0,0),(20,'Kafka',0,0,0),(21,'RabbitMQ',0,0,0),(22,'Redis',0,0,0),(23,'MongoDB',0,0,0),(24,'MySQL',60,1,1),(25,'PostgreSQL',0,0,0),(26,'SQLite',0,0,0),(27,'Oracle',0,0,0),(28,'SQL Server',0,0,0),(29,'MariaDB',0,0,0),(30,'Cassandra',0,0,0),(31,'Hadoop',0,0,0),(32,'Ansible',0,0,0),(33,'Terraform',0,0,0),(34,'Chef',0,0,0),(35,'Puppet',0,0,0),(36,'Vagrant',0,0,0),(37,'Zabbix',0,0,0),(38,'Nagios',0,0,0),(39,'New Relic',0,0,0),(40,'Splunk',0,0,0),(41,'VMware',0,0,0),(42,'VirtualBox',0,0,0),(43,'Packer',0,0,0),(44,'Artifactory',0,0,0),(45,'SonarQube',0,0,0),(46,'Harbor',0,0,0);
/*!40000 ALTER TABLE `tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools_image`
--

DROP TABLE IF EXISTS `tools_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tools_image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `tools_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `fk_tools_image_tools` (`tools_id`),
  CONSTRAINT `fk_tools_image_tools` FOREIGN KEY (`tools_id`) REFERENCES `tools` (`tools_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools_image`
--

LOCK TABLES `tools_image` WRITE;
/*!40000 ALTER TABLE `tools_image` DISABLE KEYS */;
INSERT INTO `tools_image` VALUES (1,1,'https://cdn.simpleicons.org/git',NULL,NULL,'2025-01-08 12:33:57'),(2,2,'https://cdn.simpleicons.org/docker',NULL,NULL,'2025-01-08 12:33:57'),(3,3,'https://cdn.simpleicons.org/kubernetes',NULL,NULL,'2025-01-08 12:33:57'),(4,4,'https://cdn.simpleicons.org/jenkins',NULL,NULL,'2025-01-08 12:33:57'),(5,5,'https://cdn.simpleicons.org/travisci',NULL,NULL,'2025-01-08 12:33:57'),(6,6,'https://cdn.simpleicons.org/circleci',NULL,NULL,'2025-01-08 12:33:57'),(7,7,'https://cdn.simpleicons.org/githubactions',NULL,NULL,'2025-01-08 12:33:57'),(8,8,'https://cdn.simpleicons.org/jira',NULL,NULL,'2025-01-08 12:33:57'),(9,9,'https://cdn.simpleicons.org/confluence',NULL,NULL,'2025-01-08 12:33:57'),(10,10,'https://cdn.simpleicons.org/trello',NULL,NULL,'2025-01-08 12:33:57'),(11,11,'https://cdn.simpleicons.org/slack',NULL,NULL,'2025-01-08 12:33:57'),(12,12,'https://cdn.simpleicons.org/postman',NULL,NULL,'2025-01-08 12:33:57'),(13,13,'https://cdn.simpleicons.org/insomnia',NULL,NULL,'2025-01-08 12:33:57'),(14,14,'https://cdn.simpleicons.org/swagger',NULL,NULL,'2025-01-08 12:33:57'),(15,15,'https://cdn.simpleicons.org/kibana',NULL,NULL,'2025-01-08 12:33:57'),(16,16,'https://cdn.simpleicons.org/grafana',NULL,NULL,'2025-01-08 12:33:57'),(17,17,'https://cdn.simpleicons.org/prometheus',NULL,NULL,'2025-01-08 12:33:57'),(18,18,'https://cdn.simpleicons.org/elasticsearch',NULL,NULL,'2025-01-08 12:33:57'),(19,19,'https://cdn.simpleicons.org/logstash',NULL,NULL,'2025-01-08 12:33:57'),(20,20,'https://cdn.simpleicons.org/kafka',NULL,NULL,'2025-01-08 12:33:57'),(21,21,'https://cdn.simpleicons.org/rabbitmq',NULL,NULL,'2025-01-08 12:33:57'),(22,22,'https://cdn.simpleicons.org/redis',NULL,NULL,'2025-01-08 12:33:57'),(23,23,'https://cdn.simpleicons.org/mongodb',NULL,NULL,'2025-01-08 12:33:57'),(24,24,'https://cdn.simpleicons.org/mysql',NULL,NULL,'2025-01-08 12:33:57'),(25,25,'https://cdn.simpleicons.org/postgresql',NULL,NULL,'2025-01-08 12:33:57'),(26,26,'https://cdn.simpleicons.org/sqlite',NULL,NULL,'2025-01-08 12:33:57'),(27,27,'https://cdn.simpleicons.org/oracle',NULL,NULL,'2025-01-08 12:33:57'),(28,28,'https://cdn.simpleicons.org/sqlserver',NULL,NULL,'2025-01-08 12:33:57'),(29,29,'https://cdn.simpleicons.org/mariadb',NULL,NULL,'2025-01-08 12:33:57'),(30,30,'https://cdn.simpleicons.org/cassandra',NULL,NULL,'2025-01-08 12:33:57'),(31,31,'https://cdn.simpleicons.org/hadoop',NULL,NULL,'2025-01-08 12:33:57'),(32,32,'https://cdn.simpleicons.org/ansible',NULL,NULL,'2025-01-08 12:33:57'),(33,33,'https://cdn.simpleicons.org/terraform',NULL,NULL,'2025-01-08 12:33:57'),(34,34,'https://cdn.simpleicons.org/chef',NULL,NULL,'2025-01-08 12:33:57'),(35,35,'https://cdn.simpleicons.org/puppet',NULL,NULL,'2025-01-08 12:33:57'),(36,36,'https://cdn.simpleicons.org/vagrant',NULL,NULL,'2025-01-08 12:33:57'),(37,37,'https://cdn.simpleicons.org/zabbix',NULL,NULL,'2025-01-08 12:33:57'),(38,38,'https://cdn.simpleicons.org/nagios',NULL,NULL,'2025-01-08 12:33:57'),(39,39,'https://cdn.simpleicons.org/newrelic',NULL,NULL,'2025-01-08 12:33:57'),(40,40,'https://cdn.simpleicons.org/splunk',NULL,NULL,'2025-01-08 12:33:57'),(41,41,'https://cdn.simpleicons.org/vmware',NULL,NULL,'2025-01-08 12:33:57'),(42,42,'https://cdn.simpleicons.org/virtualbox',NULL,NULL,'2025-01-08 12:33:57'),(43,43,'https://cdn.simpleicons.org/packer',NULL,NULL,'2025-01-08 12:33:57'),(44,44,'https://cdn.simpleicons.org/artifactory',NULL,NULL,'2025-01-08 12:33:57'),(45,45,'https://cdn.simpleicons.org/sonarqube',NULL,NULL,'2025-01-08 12:33:57'),(46,46,'https://cdn.simpleicons.org/harbor',NULL,NULL,'2025-01-08 12:33:57');
/*!40000 ALTER TABLE `tools_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools_roadmaps`
--

DROP TABLE IF EXISTS `tools_roadmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tools_roadmaps` (
  `roadmap_id` int NOT NULL,
  `tools_id` int NOT NULL,
  PRIMARY KEY (`roadmap_id`,`tools_id`),
  KEY `idx_tools_roadmap_tool` (`tools_id`),
  CONSTRAINT `fk_tools_roadmaps_roadmap` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmaps` (`roadmap_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tools_roadmaps_tools` FOREIGN KEY (`tools_id`) REFERENCES `tools` (`tools_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools_roadmaps`
--

LOCK TABLES `tools_roadmaps` WRITE;
/*!40000 ALTER TABLE `tools_roadmaps` DISABLE KEYS */;
INSERT INTO `tools_roadmaps` VALUES (3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(3,19),(3,20),(3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40),(3,41),(3,42),(3,43),(3,44),(3,45),(3,46);
/*!40000 ALTER TABLE `tools_roadmaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_image`
--

DROP TABLE IF EXISTS `user_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `fk_user_image_user` (`user_id`),
  CONSTRAINT `fk_user_image_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_image`
--

LOCK TABLES `user_image` WRITE;
/*!40000 ALTER TABLE `user_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `age` int DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `work_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`work_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
INSERT INTO `work_experience` VALUES (1,'Freelance','Web Developer','2020-09-01',NULL),(2,'Freelance','Software Engineer','2022-09-01',NULL),(3,'Capgemini','Internship','2020-02-01','2020-03-01'),(4,'Duplessi Farm','Data management','2021-07-01','2021-08-01'),(5,'Maastricht University','Student Ambassador','2024-10-12','2026-06-30'),(6,'Maastricht University','Project Manager','2023-09-01','2024-01-20'),(7,'Maastricht University','Project Manager','2024-02-01','2024-06-30'),(8,'Maastricht University','Project Manager','2024-09-01','2025-01-20');
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-03  7:53:19
