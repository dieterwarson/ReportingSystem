
/etc/init.d/mysql start

mysql -fu root -pmysqlroot < "./setup/testdata.sql"


cd reportingsystemExpress

npm run start:dev
