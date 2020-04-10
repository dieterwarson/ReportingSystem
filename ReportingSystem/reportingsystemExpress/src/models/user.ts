import { Model } from "sequelize";

export class User extends Model {
  public authorId!: number;
  public username!: string;
  public password!: string;
  public accessRights!: number;
}

// TODO provide safe way to save user
