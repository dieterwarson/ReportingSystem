--  Sample report database

DROP DATABASE IF EXISTS reports;
CREATE DATABASE IF NOT EXISTS reports;

USE reports;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+01:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Administratives`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administratives`
--

LOCK TABLES `Administratives` WRITE;
/*!40000 ALTER TABLE `Administratives` DISABLE KEYS */;
INSERT INTO `Administratives` VALUES (1,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,3,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,13,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,5,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,6,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,14,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,15,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(8,16,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(9,17,'2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DefectSubtypes`
--

LOCK TABLES `DefectSubtypes` WRITE;
/*!40000 ALTER TABLE `DefectSubtypes` DISABLE KEYS */;
INSERT INTO `DefectSubtypes` VALUES (1,1,'Voertuig','Zichtbare schade','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DefectTypes`
--

LOCK TABLES `DefectTypes` WRITE;
/*!40000 ALTER TABLE `DefectTypes` DISABLE KEYS */;
INSERT INTO `DefectTypes` VALUES (1,'Schade aan voertuig','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
  `defectSubtypeId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  KEY `defectTypeId` (`defectTypeId`),
  KEY `defects_technical_id` (`technicalId`),
  KEY `Defects_ibfk_4` (`defectSubtypeId`),
  CONSTRAINT `Defects_ibfk_1` FOREIGN KEY (`technicalId`) REFERENCES `Technicals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Defects_ibfk_2` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Defects_ibfk_3` FOREIGN KEY (`defectTypeId`) REFERENCES `DefectTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Defects_ibfk_4` FOREIGN KEY (`defectSubtypeId`) REFERENCES `DefectSubtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Defects`
--

LOCK TABLES `Defects` WRITE;
/*!40000 ALTER TABLE `Defects` DISABLE KEYS */;
INSERT INTO `Defects` VALUES (1,4,2,1,1,'Voertuig P320 achterlicht kapot',1,'2020-03-21 12:03:57','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,2,1,1,1,'Voertuig P321 achterlicht kapot',0,'2020-03-17 05:14:23','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,2,1,1,1,'Voertuig P256 voorlicht kapot',1,'2020-03-17 10:00:03','2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,6,1,1,1,'Voertuig P320 voorlicht kapot',1,'2020-03-21 04:33:47','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
INSERT INTO `DummyDatabases` VALUES (1,'PL12536432','CARMA','Markt 37, 3740 Bilzen','2020-04-13 11:40:32','NAV zelfmoord te Overpelt','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,'PL12536433','CARMA','Universiteitslaan 32, Diepenbeek','2020-04-13 11:40:32','NAV zelfmoord','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
  `operationalEventId` int(11) DEFAULT NULL,
  `operationalTypeId` int(11) DEFAULT NULL,
  `operationalSubtypeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_types_operational_event_id` (`operationalEventId`),
  KEY `EventTypes_ibfk_2` (`operationalTypeId`),
  KEY `EventTypes_ibfk_3` (`operationalSubtypeId`),
  CONSTRAINT `EventTypes_ibfk_1` FOREIGN KEY (`operationalEventId`) REFERENCES `OperationalEvents` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `EventTypes_ibfk_2` FOREIGN KEY (`operationalTypeId`) REFERENCES `OperationalTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `EventTypes_ibfk_3` FOREIGN KEY (`operationalSubtypeId`) REFERENCES `OperationalSubtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventTypes`
--

LOCK TABLES `EventTypes` WRITE;
/*!40000 ALTER TABLE `EventTypes` DISABLE KEYS */;
INSERT INTO `EventTypes` VALUES (1,4,6,2,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,5,1,null,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,7,6,null,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,8,6,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,6,6,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,7,6,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,8,1,null,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(8,2,1,null,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(9,3,4,null,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(10,9,6,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(11,10,6,1,'2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MalfunctionSubtypes`
--

LOCK TABLES `MalfunctionSubtypes` WRITE;
/*!40000 ALTER TABLE `MalfunctionSubtypes` DISABLE KEYS */;
INSERT INTO `MalfunctionSubtypes` VALUES (1,1,'Infrastructuur','Iets kapot','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,2,'Elektronica','Storing','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,3,'Elektriciteit','Uitgevallen','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MalfunctionTypes`
--

LOCK TABLES `MalfunctionTypes` WRITE;
/*!40000 ALTER TABLE `MalfunctionTypes` DISABLE KEYS */;
INSERT INTO `MalfunctionTypes` VALUES (1,'Voorwerp','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,'Verwittiging ASC','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,'Verwittiging (anderen)','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
  `malfunctionSubtypeId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `technicalId` (`technicalId`),
  KEY `malfunctionTypeId` (`malfunctionTypeId`),
  KEY `malfunctions_author_id` (`authorId`),
  KEY `Malfunctions_ibfk_4` (`malfunctionSubtypeId`),
  CONSTRAINT `Malfunctions_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Malfunctions_ibfk_2` FOREIGN KEY (`technicalId`) REFERENCES `Technicals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Malfunctions_ibfk_3` FOREIGN KEY (`malfunctionTypeId`) REFERENCES `MalfunctionTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Malfunctions_ibfk_4` FOREIGN KEY (`malfunctionSubtypeId`) REFERENCES `MalfunctionSubtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Malfunctions`
--

LOCK TABLES `Malfunctions` WRITE;
/*!40000 ALTER TABLE `Malfunctions` DISABLE KEYS */;
INSERT INTO `Malfunctions` VALUES (1,1,1,1,1,'lekkende kraan in kamer 304',1,'2020-03-16 09:46:45','2:16','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,1,2,1,1,'krakende deur in kamer 104',1,'2020-03-17 02:03:57','5:07','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,1,2,1,1,'niet sluitend raam in kamer 302',1,'2020-03-17 03:23:57','1:56','2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,1,6,2,2,'alarm kapot verdieping 2',1,'2020-03-21 00:15:34','0:29','2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,2,4,3,3,'stroom uitgevallen hoofdgebouw',1,'2020-03-21 15:26:24','0:13','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OperationalEvents`
--

LOCK TABLES `OperationalEvents` WRITE;
/*!40000 ALTER TABLE `OperationalEvents` DISABLE KEYS */;
INSERT INTO `OperationalEvents` VALUES (1,2,2,NULL,'PL03170104','Verwittigen labo, verwittigen team Vandevoorde',NULL,NULL,'HANO','2020-03-16 21:05:18','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,2,2,'Verlies inschrijvingsbewijs CIM NR 545102920 / 1ABC123',NULL,NULL,NULL,NULL,'KEMPLA','2020-03-16 17:13:48','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,2,2,NULL,'PL031770168','Lokalisatie gsmnr via provider, Nav onrustwekkende verdwijning meerderjarige : zelfmoordbericht',NULL,NULL,'CARMA','2020-03-16 20:34:37','2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,1,11,NULL,'PL03170315','Autodiefstal te Rummen straat van een Mercedes E300\n  - Melding binnen 101 Limburg\n  - ANPR Hit te Nieuwerkerken richting Herk de Stad\n  - Voertuig onderschept te Herk de Stad',NULL,NULL,'LRH','2020-03-17 00:21:25','2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,1,11,'Seining Jan Jansens - PZ Bihori','PL03170202','ONRUSTWEKKENDE VERDWIJNING MEERDERJARIGE\n  86 J dame vertrok te voet vanuit haar woning omstreeks 1600 u en keerde niet weer.\n  \n  Zoeking met Heli leverde niets op - einde 0015 u',1,NULL,'BIHORI','2020-03-17 23:18:57','2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,2,2,'Seining Jan Jansens - PZ LAMA',NULL,NULL,NULL,NULL,'LAMA','2020-03-16 22:34:33','2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,2,2,'Seining persoon - Jan Jansens - PZ LOON',NULL,NULL,NULL,NULL,'LOON','2020-03-16 22:57:10','2020-05-17 11:45:39','2020-05-17 11:45:39'),(8,1,11,NULL,'PL03170322','Inbraak in woning doch tussen melding en twee dagen ervoor. Geen BIN opgestart door onduidelijk tijdstip.',NULL,NULL,'LRH','2020-03-17 00:21:25','2020-05-17 11:45:39','2020-05-17 11:45:39'),(9,2,8,'Seining Alfred Brouns - PZ LAMA',NULL,NULL,NULL,NULL,'LAMA','2020-03-23 12:21:25','2020-05-17 11:45:39','2020-05-17 11:45:39'),(10,1,9,'Seining Erica De Beeck - PZ LOON',NULL,NULL,NULL,NULL,'LOON','2020-03-24 01:21:25','2020-05-17 11:45:39','2020-05-17 11:45:39'),(11,2,1,NULL,'PL03145104','Verwittigen labo, verwittigen team Remans',NULL,NULL,'HANO','2020-03-17 21:05:18','2020-05-17 11:45:39','2020-05-17 11:45:39'),(12,1,5,'Verlies inschrijvingsbewijs CIM NR 545102316 / 1ABC123',NULL,NULL,NULL,NULL,'KEMPLA','2020-03-18 10:13:48','2020-05-17 11:45:39','2020-05-17 11:45:39'),(13,1,7,NULL,'PL031745668','Lokalisatie gsmnr via provider, Nav onrustwekkende verdwijning meerderjarige : zelfmoordbericht',NULL,NULL,'CARMA','2020-03-19 01:34:37','2020-05-17 11:45:39','2020-05-17 11:45:39'),(14,2,3,NULL,'PL01452315','Autodiefstal te Kerkstraat van een Mercedes E300',NULL,NULL,'LRH','2020-03-19 20:21:25','2020-05-17 11:45:39','2020-05-17 11:45:39'),(15,1,4,'Seining Jan Jansens - PZ Bihori','PL03170202','ONRUSTWEKKENDE VERDWIJNING MEERDERJARIGE',1,NULL,'BIHORI','2020-03-20 23:18:57','2020-05-17 11:45:39','2020-05-17 11:45:39'),(16,2,6,'Seining Jan Jansens - PZ LAMA',NULL,NULL,NULL,NULL,'LAMA','2020-03-10 22:34:33','2020-05-17 11:45:39','2020-05-17 11:45:39'),(17,1,10,'Seining persoon - Jan Jansens - PZ LOON',NULL,NULL,NULL,NULL,'LOON','2020-03-24 22:57:10','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
 
--
-- Dumping data for table `OperationalSubtypes`
--
 
LOCK TABLES `OperationalSubtypes` WRITE;
/*!40000 ALTER TABLE `OperationalSubtypes` DISABLE KEYS */;
INSERT INTO `OperationalSubtypes` VALUES (1,6,'Persoon',NULL,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,6,'Voertuig',NULL,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,6,'Voorwerp',NULL,'2020-05-17 11:45:39','2020-05-17 11:45:39');
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
  `typeName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `operational_types_type_name` (`typeName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
 
--
-- Dumping data for table `OperationalTypes`
--
 
LOCK TABLES `OperationalTypes` WRITE;
/*!40000 ALTER TABLE `OperationalTypes` DISABLE KEYS */;
INSERT INTO `OperationalTypes` VALUES (1,'Specifieke gebeurtenis','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,'Grensoverschrijdende achtervolging','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,'Zoeking met helikopter','2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,'Bevraging GSM operatoren','2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,'BIN-alarm','2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,'Signalering','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Operationals`
--

LOCK TABLES `Operationals` WRITE;
/*!40000 ALTER TABLE `Operationals` DISABLE KEYS */;
INSERT INTO `Operationals` VALUES (1,4,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,2,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,8,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,9,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,5,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,10,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,7,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(8,16,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(9,17,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(10,18,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(11,3,'2020-05-17 11:45:39','2020-05-17 11:45:39');
/*!40000 ALTER TABLE `Operationals` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reports`
--

LOCK TABLES `Reports` WRITE;
/*!40000 ALTER TABLE `Reports` DISABLE KEYS */;
INSERT INTO `Reports` VALUES (1,'2020-03-16 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,'2020-03-16 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,'2020-03-17 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,'2020-03-17 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,'2020-03-18 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,'2020-03-18 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,'2020-03-19 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(8,'2020-03-19 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(9,'2020-03-20 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(10,'2020-03-20 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(11,'2020-03-21 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(12,'2020-03-21 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(13,'2020-03-22 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(14,'2020-03-22 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(15,'2020-03-23 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(16,'2020-03-23 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(17,'2020-03-24 23:01:00',0,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(18,'2020-03-24 11:01:00',0,0,'2020-05-17 11:45:39','2020-05-17 11:45:39');
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `administrativeId` (`administrativeId`),
  KEY `secretariat_notifications_author_id` (`authorId`),
  CONSTRAINT `SecretariatNotifications_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `SecretariatNotifications_ibfk_2` FOREIGN KEY (`administrativeId`) REFERENCES `Administratives` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SecretariatNotifications`
--

LOCK TABLES `SecretariatNotifications` WRITE;
/*!40000 ALTER TABLE `SecretariatNotifications` DISABLE KEYS */;
INSERT INTO `SecretariatNotifications` VALUES (1,2,6,'Jan Janssens Inp ziek',1,'2020-03-22 19:30:46','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,2,6,'James Brook Inp ziek',0,'2020-03-22 18:06:54','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,2,5,'Remans Luc Inp ziek',1,'2020-03-18 12:05:24','2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,2,8,'Remans Luc Inp ziek',1,'2020-03-23 12:15:24','2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,1,2,'Jacob Franssen Inp ziek',1,'2020-03-17 08:10:24','2020-05-17 11:45:39','2020-05-17 11:45:39');
/*!40000 ALTER TABLE `SecretariatNotifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Custom`
--

DROP TABLE IF EXISTS `Customs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customs_report_id` (`reportId`),
  CONSTRAINT `customs_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `Reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Custom`
--

LOCK TABLES `Customs` WRITE;
/*!40000 ALTER TABLE `Customs` DISABLE KEYS */;
INSERT INTO `Customs` VALUES (1,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,3,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,2,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,12,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,4,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,11,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,17,'2020-05-17 11:45:39','2020-05-17 11:45:39');
/*!40000 ALTER TABLE `Customs` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Technicals`
--

LOCK TABLES `Technicals` WRITE;
/*!40000 ALTER TABLE `Technicals` DISABLE KEYS */;
INSERT INTO `Technicals` VALUES (1,1,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,3,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,2,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,12,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,4,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,11,'2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,17,'2020-05-17 11:45:39','2020-05-17 11:45:39');
/*!40000 ALTER TABLE `Technicals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `accessRights` int(11) DEFAULT NULL,
  `subscription` tinyint(1) DEFAULT NULL,
  `loggedIn` TINYINT(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_username` (`username`),
  FOREIGN KEY (`accessRights`) REFERENCES `Permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'chass_beerts','test', 'test@gmail.com', 0, 1, 0,'2020-05-14 14:31:34','2020-05-14 14:31:34'),(2,'jan_janssens','', 'test@gmail.com',1, 0, 0,'2020-05-14 14:31:34','2020-05-14 14:31:34'),(3, 'test', '$2y$10$nANkNP.Z8ZYTDbYDc58WcOsJvQ1LtaOHHkM/v2CRR22QwZsqmu0Pi', 'test@tester.com',0, 0, 0,'2020-05-14 14:31:34','2020-05-14 14:31:34'),(4, 'sup', '$2y$10$nANkNP.Z8ZYTDbYDc58WcOsJvQ1LtaOHHkM/v2CRR22QwZsqmu0Pi', 'test@tester.com',1, 0, 0,'2020-05-14 14:31:34','2020-05-14 14:31:34'),(5, 'sec', '$2y$10$nANkNP.Z8ZYTDbYDc58WcOsJvQ1LtaOHHkM/v2CRR22QwZsqmu0Pi', 'test@tester.com',2, 0, 0,'2020-05-14 14:31:34','2020-05-14 14:31:34'),(6, 'admin', '$2y$10$nANkNP.Z8ZYTDbYDc58WcOsJvQ1LtaOHHkM/v2CRR22QwZsqmu0Pi', 'test@tester.com',0, 0, 0,'2020-05-14 14:31:34','2020-05-14 14:31:34');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `Permissions`;
CREATE TABLE `Permissions`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `makeReports` tinyint(1) DEFAULT NULL,
  `seeReports` tinyint(1) DEFAULT NULL,
  `seeNotifications` tinyint(1) DEFAULT NULL,
  `seePreviousShift` tinyint(1) DEFAULT NULL,
  `seeStatistics` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `permissions_name` (`name`)
  )ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

  
LOCK TABLES `Permissions` WRITE;
/*!40000 ALTER TABLE `Permissions` DISABLE KEYS */;
INSERT INTO `Permissions` VALUES (0,'admin',1 , 1, 1, 1, 1, '2020-05-14 14:31:34','2020-05-14 14:31:34'), (1, 'supervisor', 1, 1, 1, 1, 1, '2020-05-14 14:31:34','2020-05-14 14:31:34'), (2, 'secretariaat', 0, 0, 1, 1, 1, '2020-05-14 14:31:34','2020-05-14 14:31:34');
/*!40000 ALTER TABLE `Permissions` ENABLE KEYS */;
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
  `workplaceSubtypeId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `absentee` varchar(255) DEFAULT NULL,
  `substitute` varchar(255) DEFAULT NULL,
  `monitoring` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `administrativeId` (`administrativeId`),
  KEY `workplaceTypeId` (`workplaceTypeId`),
  KEY `workplace_events_author_id` (`authorId`),
  KEY `WorkplaceEvents_ibfk_4` (`workplaceSubtypeId`),
  CONSTRAINT `WorkplaceEvents_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WorkplaceEvents_ibfk_2` FOREIGN KEY (`administrativeId`) REFERENCES `Administratives` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WorkplaceEvents_ibfk_3` FOREIGN KEY (`workplaceTypeId`) REFERENCES `WorkplaceTypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `WorkplaceEvents_ibfk_4` FOREIGN KEY (`workplaceSubtypeId`) REFERENCES `WorkplaceSubtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WorkplaceEvents`
--

LOCK TABLES `WorkplaceEvents` WRITE;
/*!40000 ALTER TABLE `WorkplaceEvents` DISABLE KEYS */;
INSERT INTO `WorkplaceEvents` VALUES (1,1,1,1,1,'Jacob sleutelbeen gebroken','Jacob Franssen','James Brook',1,'2020-03-16 08:10:23','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,2,5,2,0,'Ziekte','Remans Luc','Jan Janssens',1,'2020-03-18 12:03:14','2020-05-17 11:45:39','2020-05-17 11:45:39'),(3,1,3,1,1,'Hans verstuikte voet','Hans Hendrickx','Adam Franssen',1,'2020-03-22 06:59:34','2020-05-17 11:45:39','2020-05-17 11:45:39'),(4,2,6,2,0,'Ziekte','James Brook','Jacob Franssen',0,'2020-03-22 18:00:54','2020-05-17 11:45:39','2020-05-17 11:45:39'),(5,2,6,2,0,'Ziekte','Jan Janssens','Remans Luc',1,'2020-03-22 19:26:14','2020-05-17 11:45:39','2020-05-17 11:45:39'),(6,1,7,1,1,'Jan arm gebroken','Jan Janssens','James Brook',1,'2020-03-23 08:10:23','2020-05-17 11:45:39','2020-05-17 11:45:39'),(7,2,8,2,0,'Ziekte','Remans Luc','Jacob Franssen',1,'2020-03-23 12:03:14','2020-05-17 11:45:39','2020-05-17 11:45:39'),(8,1,2,2,0,'Ziekte','Jacob Franssen','Jan Janssens',1,'2020-03-17 08:03:14','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
INSERT INTO `WorkplaceSubtypes` VALUES (1,1,'Ziek','Ziek','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WorkplaceTypes`
--

LOCK TABLES `WorkplaceTypes` WRITE;
/*!40000 ALTER TABLE `WorkplaceTypes` DISABLE KEYS */;
INSERT INTO `WorkplaceTypes` VALUES (1,'Ziekte','2020-05-17 11:45:39','2020-05-17 11:45:39'),(2,'Arbeidsongeval','2020-05-17 11:45:39','2020-05-17 11:45:39');
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
