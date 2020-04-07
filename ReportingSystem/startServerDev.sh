
/etc/init.d/mysql start

mysql -fu root -pmysqlroot < "mysql_secure_install.sql"
mysql -fu root -pmysqlroot < "testdata.sql"

cd psopv-2020-groep1/ReportingSystem/reportingsystemVue 
npm install 
yarn build --dest ../reportingsystemExpress/src/public 
cd -
cd psopv-2020-groep1/ReportingSystem/reportingsystemExpress 
npm install


cd reportingsystemExpress
npm run start:dev