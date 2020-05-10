--  Sample report database

DROP DATABASE IF EXISTS reports;
CREATE DATABASE IF NOT EXISTS reports;

USE reports;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Administratives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Administratives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `administratives_report_id` (`reportId`),
  CONSTRAINT `Administratives_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `Reports` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administratives`
--

LOCK TABLES `Administratives` WRITE;
/*!40000 ALTER TABLE `Administratives` DISABLE KEYS */;
INSERT INTO `Administratives` VALUES (1,1,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `Administratives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DefectSubtypes`
--

DROP TABLE IF EXISTS `DefectSubtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DefectSubtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `defectTypeId` int(11) DEFAULT NULL,
  `typeName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `defect_subtypes_defect_type_id` (`defectTypeId`),
  CONSTRAINT `DefectSubtypes_ibfk_1` FOREIGN KEY (`defectTypeId`) REFERENCES `DefectTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DefectSubtypes`
--

LOCK TABLES `DefectSubtypes` WRITE;
/*!40000 ALTER TABLE `DefectSubtypes` DISABLE KEYS */;
INSERT INTO `DefectSubtypes` VALUES (1,1,'defectSubtype typeName','defectSubtype lekkende kraan','2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,2,'defectSubtype typeName','defectSubtype krakende deur','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `DefectSubtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DefectTypes`
--

DROP TABLE IF EXISTS `DefectTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DefectTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `defect_types_type_name` (`typeName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DefectTypes`
--

LOCK TABLES `DefectTypes` WRITE;
/*!40000 ALTER TABLE `DefectTypes` DISABLE KEYS */;
INSERT INTO `DefectTypes` VALUES (1,'lekkende kraan','2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,'krakende deur','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `DefectTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Defects`
--

DROP TABLE IF EXISTS `Defects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Defects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `technicalId` int(11) DEFAULT NULL,
  `authorId` int(11) DEFAULT NULL,
  `defectTypeId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  KEY `defectTypeId` (`defectTypeId`),
  KEY `defects_technical_id` (`technicalId`),
  CONSTRAINT `Defects_ibfk_1` FOREIGN KEY (`technicalId`) REFERENCES `Technicals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Defects_ibfk_2` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Defects_ibfk_3` FOREIGN KEY (`defectTypeId`) REFERENCES `DefectTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Defects`
--

LOCK TABLES `Defects` WRITE;
/*!40000 ALTER TABLE `Defects` DISABLE KEYS */;
INSERT INTO `Defects` VALUES (3,1,1,1,'lekkende kraan in lokaal 102',1,'2020-05-10 11:31:46','2020-05-10 11:31:46','2020-05-10 11:31:46');
/*!40000 ALTER TABLE `Defects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DummyDatabases`
--

DROP TABLE IF EXISTS `DummyDatabases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DummyDatabases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plNumber` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `actions` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dummy_databases_pl_number` (`plNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DummyDatabases`
--

LOCK TABLES `DummyDatabases` WRITE;
/*!40000 ALTER TABLE `DummyDatabases` DISABLE KEYS */;
INSERT INTO `DummyDatabases` VALUES (1,'PL12536432','CARMA','Markt 37, 3740 Bilzen','2020-04-13 12:40:32','NAV zelfmoord te Overpelt','2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,'PL12536433','CARMA','Universiteitslaan 32, Diepenbeek','2020-04-13 12:40:32','NAV zelfmoord','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `DummyDatabases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EventTypes`
--

DROP TABLE IF EXISTS `EventTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EventTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportId` int(11) DEFAULT NULL,
  `operationalEventId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `operationalEventId` (`operationalEventId`),
  KEY `event_types_report_id` (`reportId`),
  CONSTRAINT `EventTypes_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `Reports` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `EventTypes_ibfk_2` FOREIGN KEY (`operationalEventId`) REFERENCES `OperationalEvents` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventTypes`
--

LOCK TABLES `EventTypes` WRITE;
/*!40000 ALTER TABLE `EventTypes` DISABLE KEYS */;
INSERT INTO `EventTypes` VALUES (1,1,1,'2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,1,1,'2020-05-10 11:31:10','2020-05-10 11:31:10'),(3,1,1,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `EventTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MalfunctionSubtypes`
--

DROP TABLE IF EXISTS `MalfunctionSubtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MalfunctionSubtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `malfunctionTypeId` int(11) DEFAULT NULL,
  `typeName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `malfunction_subtypes_malfunction_type_id` (`malfunctionTypeId`),
  CONSTRAINT `MalfunctionSubtypes_ibfk_1` FOREIGN KEY (`malfunctionTypeId`) REFERENCES `MalfunctionTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MalfunctionSubtypes`
--

LOCK TABLES `MalfunctionSubtypes` WRITE;
/*!40000 ALTER TABLE `MalfunctionSubtypes` DISABLE KEYS */;
INSERT INTO `MalfunctionSubtypes` VALUES (1,1,'malfunctionSubtype typeName','malfunctionSubtype description','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `MalfunctionSubtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MalfunctionTypes`
--

DROP TABLE IF EXISTS `MalfunctionTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MalfunctionTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `malfunction_types_type_name` (`typeName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MalfunctionTypes`
--

LOCK TABLES `MalfunctionTypes` WRITE;
/*!40000 ALTER TABLE `MalfunctionTypes` DISABLE KEYS */;
INSERT INTO `MalfunctionTypes` VALUES (1,'malfunctionType typeName','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `MalfunctionTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Malfunctions`
--

DROP TABLE IF EXISTS `Malfunctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Malfunctions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `technicalId` int(11) DEFAULT NULL,
  `malfunctionTypeId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `technicalId` (`technicalId`),
  KEY `malfunctionTypeId` (`malfunctionTypeId`),
  KEY `malfunctions_author_id` (`authorId`),
  CONSTRAINT `Malfunctions_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Malfunctions_ibfk_2` FOREIGN KEY (`technicalId`) REFERENCES `Technicals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Malfunctions_ibfk_3` FOREIGN KEY (`malfunctionTypeId`) REFERENCES `MalfunctionTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Malfunctions`
--

LOCK TABLES `Malfunctions` WRITE;
/*!40000 ALTER TABLE `Malfunctions` DISABLE KEYS */;
INSERT INTO `Malfunctions` VALUES (1,1,1,1,'lekkende kraan in kamer 304',1,'2020-04-15 13:03:57',6,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `Malfunctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OperationalEvents`
--

DROP TABLE IF EXISTS `OperationalEvents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OperationalEvents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `operationalId` int(11) DEFAULT NULL,
  `signaling` varchar(255) DEFAULT NULL,
  `plNumber` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `priority` tinyint(1) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `operationalId` (`operationalId`),
  KEY `operational_events_author_id` (`authorId`),
  CONSTRAINT `OperationalEvents_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `OperationalEvents_ibfk_2` FOREIGN KEY (`operationalId`) REFERENCES `Operationals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OperationalEvents`
--

LOCK TABLES `OperationalEvents` WRITE;
/*!40000 ALTER TABLE `OperationalEvents` DISABLE KEYS */;
INSERT INTO `OperationalEvents` VALUES (1,1,1,'Seining persoon',NULL,NULL,NULL,NULL,'LOON','2020-03-16 23:57:10','2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,1,1,'Seining persoon',NULL,NULL,NULL,NULL,'LAMA','2020-03-16 23:34:33','2020-05-10 11:31:10','2020-05-10 11:31:10'),(3,1,1,NULL,'PL03170104',NULL,NULL,NULL,'HANO','2020-03-16 22:05:18','2020-05-10 11:31:10','2020-05-10 11:31:10'),(4,1,1,NULL,'PL031770168',NULL,NULL,NULL,'CARMA','2020-03-16 21:34:37','2020-05-10 11:31:10','2020-05-10 11:31:10'),(5,1,1,'Verlies inschrijvingsbewijs',NULL,NULL,NULL,NULL,'KEMPLA','2020-03-16 18:13:48','2020-05-10 11:31:10','2020-05-10 11:31:10'),(6,1,1,'Seining persoon','PL03170202',NULL,1,NULL,'BIHORI','2020-03-16 00:18:57','2020-05-10 11:31:10','2020-05-10 11:31:10'),(7,1,1,NULL,'PL03170104',NULL,NULL,NULL,'HANO','2020-03-16 00:45:45','2020-05-10 11:31:10','2020-05-10 11:31:10'),(8,1,1,NULL,'PL03170315',NULL,NULL,NULL,'LRH','2020-03-16 01:21:25','2020-05-10 11:31:10','2020-05-10 11:31:10'),(9,1,1,NULL,'PL03170322',NULL,NULL,NULL,'LRH','2020-03-16 01:51:47','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `OperationalEvents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OperationalSubtypes`
--

DROP TABLE IF EXISTS `OperationalSubtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OperationalSubtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operationalTypeId` int(11) DEFAULT NULL,
  `typeName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `operational_subtypes_operational_type_id` (`operationalTypeId`),
  CONSTRAINT `OperationalSubtypes_ibfk_1` FOREIGN KEY (`operationalTypeId`) REFERENCES `OperationalTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OperationalSubtypes`
--

LOCK TABLES `OperationalSubtypes` WRITE;
/*!40000 ALTER TABLE `OperationalSubtypes` DISABLE KEYS */;
INSERT INTO `OperationalSubtypes` VALUES (1,2,NULL,'operationalSubtype description','2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,1,NULL,'operationalSubtype description','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `OperationalSubtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OperationalTypes`
--

DROP TABLE IF EXISTS `OperationalTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OperationalTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventTypeId` int(11) DEFAULT NULL,
  `typeName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `operational_types_event_type_id` (`eventTypeId`),
  CONSTRAINT `OperationalTypes_ibfk_1` FOREIGN KEY (`eventTypeId`) REFERENCES `EventTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OperationalTypes`
--

LOCK TABLES `OperationalTypes` WRITE;
/*!40000 ALTER TABLE `OperationalTypes` DISABLE KEYS */;
INSERT INTO `OperationalTypes` VALUES (1,1,'Helikopter ingezet','2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,2,'Grensoverschrijdende achtervolging','2020-05-10 11:31:10','2020-05-10 11:31:10'),(3,3,'Helikopter ingezet','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `OperationalTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Operationals`
--

DROP TABLE IF EXISTS `Operationals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Operationals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `operationals_report_id` (`reportId`),
  CONSTRAINT `Operationals_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `Reports` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Operationals`
--

LOCK TABLES `Operationals` WRITE;
/*!40000 ALTER TABLE `Operationals` DISABLE KEYS */;
INSERT INTO `Operationals` VALUES (1,1,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `Operationals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Replacements`
--

DROP TABLE IF EXISTS `Replacements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Replacements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `administrativeId` int(11) DEFAULT NULL,
  `absentee` varchar(255) DEFAULT NULL,
  `substitute` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `shift` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `administrativeId` (`administrativeId`),
  KEY `replacements_author_id` (`authorId`),
  CONSTRAINT `Replacements_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Replacements_ibfk_2` FOREIGN KEY (`administrativeId`) REFERENCES `Administratives` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Replacements`
--

LOCK TABLES `Replacements` WRITE;
/*!40000 ALTER TABLE `Replacements` DISABLE KEYS */;
INSERT INTO `Replacements` VALUES (1,1,1,'Jan Jacobs','Geordy Hendricks',1,'2020-03-30 15:46:36',1,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `Replacements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reports`
--

DROP TABLE IF EXISTS `Reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `temporary` tinyint(1) DEFAULT NULL,
  `nightShift` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reports_date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reports`
--

LOCK TABLES `Reports` WRITE;
/*!40000 ALTER TABLE `Reports` DISABLE KEYS */;
INSERT INTO `Reports` VALUES (1,'2020-03-16 21:13:48',0,1,'2020-05-10 11:26:57','2020-05-10 11:26:57'),(2,'2020-03-16 21:13:48',0,1,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `Reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SecretariatNotifications`
--

DROP TABLE IF EXISTS `SecretariatNotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SecretariatNotifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `administrativeId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `shift` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `administrativeId` (`administrativeId`),
  KEY `secretariat_notifications_author_id` (`authorId`),
  CONSTRAINT `SecretariatNotifications_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `SecretariatNotifications_ibfk_2` FOREIGN KEY (`administrativeId`) REFERENCES `Administratives` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SecretariatNotifications`
--

LOCK TABLES `SecretariatNotifications` WRITE;
/*!40000 ALTER TABLE `SecretariatNotifications` DISABLE KEYS */;
INSERT INTO `SecretariatNotifications` VALUES (1,1,1,'Jan Janssens Inp ziek',1,'2020-03-16 19:19:49',1,'2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,1,1,'Remans Luc Inp ziek',1,'2020-03-16 19:21:46',1,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `SecretariatNotifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Technicals`
--

DROP TABLE IF EXISTS `Technicals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Technicals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `technicals_report_id` (`reportId`),
  CONSTRAINT `Technicals_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `Reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Technicals`
--

LOCK TABLES `Technicals` WRITE;
/*!40000 ALTER TABLE `Technicals` DISABLE KEYS */;
INSERT INTO `Technicals` VALUES (1,1,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `Technicals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `accessRights` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'jan_janssens','',0,'2020-05-10 11:31:10','2020-05-10 11:31:10'),(2,'chass_beerts','test',0,'2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WorkplaceEvents`
--

DROP TABLE IF EXISTS `WorkplaceEvents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WorkplaceEvents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `administrativeId` int(11) DEFAULT NULL,
  `workplaceTypeId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `absentee` varchar(255) DEFAULT NULL,
  `substitute` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `shift` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `administrativeId` (`administrativeId`),
  KEY `workplaceTypeId` (`workplaceTypeId`),
  KEY `workplace_events_author_id` (`authorId`),
  CONSTRAINT `WorkplaceEvents_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WorkplaceEvents_ibfk_2` FOREIGN KEY (`administrativeId`) REFERENCES `Administratives` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WorkplaceEvents_ibfk_3` FOREIGN KEY (`workplaceTypeId`) REFERENCES `WorkplaceTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WorkplaceEvents`
--

LOCK TABLES `WorkplaceEvents` WRITE;
/*!40000 ALTER TABLE `WorkplaceEvents` DISABLE KEYS */;
/*!40000 ALTER TABLE `WorkplaceEvents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WorkplaceSubtypes`
--

DROP TABLE IF EXISTS `WorkplaceSubtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WorkplaceSubtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workplaceTypeId` int(11) DEFAULT NULL,
  `typeName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workplace_subtypes_workplace_type_id` (`workplaceTypeId`),
  CONSTRAINT `WorkplaceSubtypes_ibfk_1` FOREIGN KEY (`workplaceTypeId`) REFERENCES `WorkplaceTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WorkplaceSubtypes`
--

LOCK TABLES `WorkplaceSubtypes` WRITE;
/*!40000 ALTER TABLE `WorkplaceSubtypes` DISABLE KEYS */;
INSERT INTO `WorkplaceSubtypes` VALUES (1,1,'workplaceSubtype typeName','workplaceSubtype description','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `WorkplaceSubtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WorkplaceTypes`
--

DROP TABLE IF EXISTS `WorkplaceTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WorkplaceTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workplace_types_type_name` (`typeName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WorkplaceTypes`
--

LOCK TABLES `WorkplaceTypes` WRITE;
/*!40000 ALTER TABLE `WorkplaceTypes` DISABLE KEYS */;
INSERT INTO `WorkplaceTypes` VALUES (1,'workplaceType typeName','2020-05-10 11:31:10','2020-05-10 11:31:10');
/*!40000 ALTER TABLE `WorkplaceTypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
