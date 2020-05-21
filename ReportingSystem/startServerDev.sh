
/etc/init.d/mysql start

cd psopv-2020-groep1/ReportingSystem

mysql -fu root -pmysqlroot < "./setup/mysql_secure_install.sql"
mysql -fu root -pmysqlroot < "./setup/testdata.sql"

cd reportingsystemVue
npm install 
yarn build --dest ../reportingsystemExpress/src/public 
cd -
cd reportingsystemExpress 
npm install

npm run start:dev
