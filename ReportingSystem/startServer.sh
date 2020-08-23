
/etc/init.d/mysql start

mysql -fu root -pmysqlroot < "./setup/testdata.sql"
mysql -fu root -pmysqlroot < "./setup/levenshtein.sql"
mysql -fu root -pmysqlroot < "./setup/indexes.sql"

cd reportingsystemExpress

npm run start:dev
