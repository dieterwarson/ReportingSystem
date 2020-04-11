import { Sequelize, Model, DataTypes } from "sequelize";
import { setupConnection } from "../config/config";
import { WorkplaceType } from './workplaceType';

let config = new setupConnection();

let sequelize = new Sequelize(config.getDatabase());

export class WorkplaceEvent extends Model {
  public workplaceEventId!: number;
  public type!: WorkplaceType;
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
    type: {
      type: WorkplaceType,
      allowNull: false,
    },
    absentee: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    substitute: {
      type: new DataTypes.STRING(128),
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
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    modelName: "workplaceEvent",
    sequelize: sequelize,
  }
);
