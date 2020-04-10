import { Model } from "sequelize";

export class OperationalEvent extends Model {
  public operationalEventId!: number;
  public operationalTypeId!: number;
  public signaling!: string;
  public plNumber!: string;
  public eventDescription!: string;
  public location!: string;
  public unit!: string;
  public date!: Date;
}
