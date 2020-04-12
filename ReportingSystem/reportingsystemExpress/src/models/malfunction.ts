import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import MalfunctionType from "./malfunctionType";

@Table
export default class Malfunction extends Model<Malfunction> {
  @Index
  @Column
  malfunctionTypeId!: number;
  @Column
  description!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
  @Column
  duration!: number;
}

