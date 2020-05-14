// needs to be changed to use .env file 

import {Sequelize} from 'sequelize-typescript';
 
const sequelize = new Sequelize({
        database: 'reports',
        dialect: 'mysql',
        username: 'root',
        password: 'mysqlroot',
        models: [__dirname + '/models'], // or [Player, Team],
});

export default sequelize;

