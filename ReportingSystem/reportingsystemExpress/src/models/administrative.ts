import { Model } from "sequelize";
import { WorkplaceEvent } from './workplaceEvent';

export class OperationalSubtype extends Model {
  public reportId!: number;
  public absence!: boolean;
  public workplaceEvent!: WorkplaceEvent;
}
