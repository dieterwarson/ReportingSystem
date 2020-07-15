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
CREATE INDEX defect_description_idx
ON Defects (description);

/* Malfunctions */
CREATE INDEX malfunction_description_idx
ON Malfunctions (description);

/* OperationalEvents */
CREATE INDEX operationalevent_description_idx
ON OperationalEvents (description);

CREATE INDEX operationalevent_unit_idx
ON OperationalEvents (unit);

CREATE INDEX operationalevent_location_idx
ON OperationalEvents (location);

CREATE INDEX operationalevent_signaling_idx
ON OperationalEvents (signaling);

CREATE INDEX operationalevent_plNumber_idx
ON OperationalEvents (plNumber);

/* SecretariatNotifications */
CREATE INDEX secretariatnotification_description_idx
ON SecretariatNotifications (description);

/* WorkplaceEvents */
CREATE INDEX workplaceevent_description_idx
ON WorkplaceEvents (description);

CREATE INDEX workplaceevent_absentee_idx
ON WorkplaceEvents (absentee);

CREATE INDEX workplaceevent_substitute_idx
ON WorkplaceEvents (substitute);
