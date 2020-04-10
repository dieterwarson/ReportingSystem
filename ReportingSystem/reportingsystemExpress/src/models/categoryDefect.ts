import { Model } from "sequelize";

export class CategoryDefect extends Model {
  public reportId!: number;
  public defectId!: number;
}
