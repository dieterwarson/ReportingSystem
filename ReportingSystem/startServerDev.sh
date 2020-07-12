
/etc/init.d/mysql start

cd psopv-2020-groep1/ReportingSystem

mysql -fu root -pmysqlroot < "./setup/mysql_secure_installation.sql"
mysql -fu root -pmysqlroot < "./setup/testdata.sql"
mysql -fu root -pmysqlroot < "./setup/levenshtein.sql"

cd reportingsystemVue
npm install 
yarn build --dest ../reportingsystemExpress/src/public 
cd -
cd reportingsystemExpress 
npm install

npm run start:dev
