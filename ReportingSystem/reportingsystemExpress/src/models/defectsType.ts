import { Model } from "sequelize";

export class DefectsType extends Model {
  public defectsTypeId!: number;
  public defectsSubtypeId!: number;
  public typeName!: string;
}
