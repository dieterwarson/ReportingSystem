import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { Defect } from "./defect";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class CategoryDefect extends Model {
  public reportId!: number;
  public defectId!: number;
}

CategoryDefect.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    defectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "categoryDefect",
    sequelize: sequelize,
  }
);

CategoryDefect.hasMany(Defect, {
  sourceKey: "reportId",
  foreignKey: "defectId",
  as: "defects",
});
