import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class User extends Model {
  public authorId!: number;
  public username!: string;
  public password!: string;
  public accessRights!: number;
}

// TODO provide safe way to save user

User.init(
  {
    authorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: { // provide encryption for password
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    accessRights: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "users",
    sequelize: sequelize,
  }
);
