import { Model } from "sequelize";

export class OperationalSubtype extends Model {
  public reportId!: number;
  public absence!: boolean;
}
