import { Sequelize, Model, DataTypes, TINYINT } from "sequelize";
import { sequelize } from "../Server"


export class Report extends Model {
  public reportId!: number;
  public authorId!: number;
  public date!: Date;
  public temporary!: boolean;
  
  constructor(){
    super();
    this.initseq();
  }

  initseq(){
    Report.init(
      {
        reportId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        authorId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        temporary: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        modelName: "report",
        sequelize: sequelize,
      }
    );
  }
}

