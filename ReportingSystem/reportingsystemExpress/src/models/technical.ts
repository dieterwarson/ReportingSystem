import { Model } from "sequelize";
import { CategoryMalfunction } from './categoryMalfunction';
import { CategoryDefect } from './categoryDefect';

export class Technical extends Model {
  public reportId!: number;
  public malfunction!: CategoryMalfunction;
  public defect!: CategoryDefect;
}
