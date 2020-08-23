
/etc/init.d/mysql start

mysql -fu root -pmysqlroot < "./setup/testdata.sql"
mysql -fu root -pmysqlroot < "./setup/levenshtein.sql"
mysql -fu root -pmysqlroot < "./setup/indexes.sql"

cd reportingsystemVue
npm install 
yarn build --dest ../reportingsystemExpress/src/public 
cd -
cd reportingsystemExpress

npm run start:dev
