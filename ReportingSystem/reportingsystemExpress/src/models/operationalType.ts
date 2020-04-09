import { Model } from "sequelize";

export class OperationalType extends Model {
  public operationalTypeId!: number;
  public operationalSubtypeId!: number;
  public typeName!: string;
}
