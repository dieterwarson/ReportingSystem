import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { Defect } from "./defect";

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class ReportCategories extends Model {
  public reportId!: number;
  public categoryId!: number;
}

ReportCategories.init(
  {
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "reportCategories",
    sequelize: sequelize,
  }
);

// ReportCategories.hasMany(Defect, {
//   sourceKey: "reportId",
//   foreignKey: "categoryId",
//   as: "defects",
// });
