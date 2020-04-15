import { Model } from "sequelize";

export class Operational extends Model {
  public reportId!: number;
  public operationalId!: number;
}
