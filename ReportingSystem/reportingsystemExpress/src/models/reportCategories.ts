import { Model } from "sequelize";

export class ReportCategories extends Model {
  public reportId!: number;
  public categoryId!: number;
}
