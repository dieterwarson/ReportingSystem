import { Model } from "sequelize";

export class CategoryMalfunction extends Model {
  public reportId!: number;
  public malfunctionId!: number;
}
