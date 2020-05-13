// needs to be changed to use .env file 

import {Sequelize} from 'sequelize-typescript';
import Administrative from 'src/models/administrative';
 
export const sequelize =  new Sequelize({
        database: 'reports',
        dialect: 'mysql',
        username: 'root',
        password: 'mysqlroot',
        models: /*[__dirname + '/models']*/ [Administrative], // or [Player, Team],
});

