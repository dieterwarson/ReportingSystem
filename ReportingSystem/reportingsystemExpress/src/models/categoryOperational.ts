import { Model } from "sequelize";

export class CategoryOperational extends Model {
  public reportId!: number;
  public operationalEventId!: number;
}
