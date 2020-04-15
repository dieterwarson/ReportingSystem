import { Model } from "sequelize";

export class Report extends Model {
  public reportId!: number;
  public authorId!: number;
  public date!: Date;
  public temporary!: boolean;
}
