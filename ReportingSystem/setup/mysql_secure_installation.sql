DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DROP DATABASE IF EXISTS reports;
DELETE FROM mysql.db WHERE Db='reports' OR Db='reports\\_%';
FLUSH PRIVILEGES;
