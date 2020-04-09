import { Model } from "sequelize";
import { MalfunctionType } from './malfunctionType';

export class Malfunction extends Model {
  public malfunctionId!: number;
  public type!: MalfunctionType;
  public description!: string;
  public monitoring!: boolean;
  public date!: Date;
  public duration!: number;
}
