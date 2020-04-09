import { Model } from "sequelize";

export class OperationalSubtype extends Model {
  public operationalSubtypeId!: number;
  public typeName!: string;
  public description!: string;
}
