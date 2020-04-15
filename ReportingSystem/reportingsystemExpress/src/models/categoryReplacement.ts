import { Model } from "sequelize";
import { WorkplaceEvent } from './workplaceEvent';

export class CategoryReplacement extends Model implements WorkplaceEvent {
  public reportId!: number;
  public replacementId!: number;
}
