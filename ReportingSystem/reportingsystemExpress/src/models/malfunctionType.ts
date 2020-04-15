import { Model } from "sequelize";

export class MalfunctionType extends Model {
  public malfunctionTypeId!: number;
  public malfunctionSubtypeId!: number;
  public typeName!: string;
}
