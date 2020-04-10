import { Model } from "sequelize";

export class Replacement extends Model {
  public replacementId!: number;
  public absentee!: string;
  public substitute!: string;
  public monitoring!: boolean;
  public date!: Date;
  public shift!: boolean;
}
