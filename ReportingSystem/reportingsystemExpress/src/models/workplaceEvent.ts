import { Model } from "sequelize";
import { WorkplaceType } from './workplaceType';

export class WorkplaceEvent extends Model {
  public workplaceEventId!: number;
  public type!: WorkplaceType;
  public absentee!: string;
  public substitute!: string;
  public monitoring!: boolean;
  public date!: Date;
  public shift!: boolean;
  public description!: string;
}
