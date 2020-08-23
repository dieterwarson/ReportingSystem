--  Sample report database

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

/* Defects */
ALTER TABLE Defects
add FULLTEXT(description);

/* Malfunctions */
ALTER TABLE Malfunctions
add FULLTEXT(description);

/* OperationalEvents */
ALTER TABLE OperationalEvents
add FULLTEXT(description, unit, location, signaling, plNumber);

/* SecretariatNotifications */
ALTER TABLE SecretariatNotifications
add FULLTEXT(description);

/* WorkplaceEvents */
ALTER TABLE WorkplaceEvents
add FULLTEXT(description, absentee, substitute);

/* Custom */
/* ALTER TABLE CustomEvents
add FULLTEXT(field1);
ALTER TABLE CustomEvents ENABLE KEYS;
ALTER INDEX field1 VISIBLE; */
