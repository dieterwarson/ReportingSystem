
/etc/init.d/mysql start

cd psopv-2020-groep1/ReportingSystem

mysql -fu root -pmysqlroot < "./setup/mysql_secure_install.sql"
mysql -fu root -pmysqlroot < "./setup/testdata.sql"


cd reportingsystemExpress

npm run start:dev
