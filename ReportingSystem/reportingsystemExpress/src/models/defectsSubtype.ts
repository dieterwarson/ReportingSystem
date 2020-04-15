import { Model } from "sequelize";

export class DefectsSubtype extends Model {
  public defectsSubtypeId!: number;
  public typeName!: string;
  public description!: string;
}
