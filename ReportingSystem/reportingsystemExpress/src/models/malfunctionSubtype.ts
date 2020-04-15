import { Model } from "sequelize";

export class MalfunctionSubtype extends Model {
  public malfunctionSubtypeId!: number;
  public typeName!: string;
  public description!: string;
}
