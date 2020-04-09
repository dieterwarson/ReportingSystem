import { Model } from "sequelize";

export class CategoryWorkplaceEvent extends Model {
  public reportId!: number;
  public workplaceEventId!: number;
}
