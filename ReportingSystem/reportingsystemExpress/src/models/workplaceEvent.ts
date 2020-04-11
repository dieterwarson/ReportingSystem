import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { WorkplaceType } from './workplaceType';

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class WorkplaceEvent extends Model {
  public workplaceEventId!: number;
  public workplaceTypeId!: WorkplaceType;
  public absentee!: string;
  public substitute!: string;
  public monitoring!: boolean;
  public date!: Date;
  public shift!: boolean;
  public description!: string;
}

WorkplaceEvent.init(
  {
    workplaceEventId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    workplaceTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    absentee: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    substitute: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    monitoring: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shift: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "workplaceEvent",
    sequelize: sequelize,
  }
);
