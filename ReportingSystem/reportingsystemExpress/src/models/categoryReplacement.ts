import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { Replacement } from './replacement';

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class CategoryReplacement extends Model {
  public reportId!: number;
  public replacementId!: number;
}

CategoryReplacement.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    replacementId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "categoryReplacement",
    sequelize: sequelize,
  }
);

CategoryReplacement.hasMany(Replacement, {
  sourceKey: "reportId",
  foreignKey: "replacementId",
  as: "replacements",
});
