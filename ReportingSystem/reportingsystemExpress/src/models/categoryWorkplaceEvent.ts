import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { WorkplaceEvent } from './workplaceEvent';

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class CategoryWorkplaceEvent extends Model {
  public administrativeId!: number;
  public workplaceEventId!: number;
}

CategoryWorkplaceEvent.init(
  {
    administrativeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    workplaceEventId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    modelName: "categoryWorkplaceEvent",
    sequelize: sequelize,
  }
);

CategoryWorkplaceEvent.hasMany(WorkplaceEvent, {
  sourceKey: "administrativeId",
  foreignKey: "workplaceEventId",
  as: "workplaceEvents",
});
