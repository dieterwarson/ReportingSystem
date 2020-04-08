import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { setupConnection } from '../config/config';

let config = new setupConnection();

const sequelize = new Sequelize(config.getDatabase());

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }