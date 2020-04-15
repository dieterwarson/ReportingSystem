import { Model } from "sequelize";

export interface WorkplaceEvent extends Model {
  readonly reportId: number;
}
