import { Model } from "sequelize";

export class WorkplaceType extends Model {
  public workplaceTypeId!: number;
  public typeName!: string;
}
