import { Model } from "sequelize";

export class User extends Model {
    public id!: number;
    public name!: string;
    public passHash!: string;
    
}

// TODO provide safe way to save user