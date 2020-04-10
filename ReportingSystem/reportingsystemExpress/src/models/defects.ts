import { Model } from "sequelize";
import { DefectsType } from "./defectsType";

export class Defects extends Model {
  public defectsId!: number;
  public type!: DefectsType;
  public description!: string;
  public monitoring!: boolean;
  public date!: Date;
}
