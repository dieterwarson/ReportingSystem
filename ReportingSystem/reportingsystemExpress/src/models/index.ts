import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { setupConnection } from '../config/config';
import { User } from './user'

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  passHash: { // provide encryption for password
    type: new DataTypes.STRING(128),
    allowNull: false
  }
}, {
  tableName: 'users',
  sequelize: sequelize,
});