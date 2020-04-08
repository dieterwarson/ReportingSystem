import { Model } from "sequelize/types";

class User extends Model {
    public id!: number;
    public name!: string;
    public passHash!: string;
}