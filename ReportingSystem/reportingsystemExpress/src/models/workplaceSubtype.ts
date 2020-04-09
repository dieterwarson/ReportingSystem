import { Model } from "sequelize";

export class WorkplaceSubtype extends Model {
  public workplaceSubtypeId!: number;
  public typeName!: string;
  public description!: string;
}
