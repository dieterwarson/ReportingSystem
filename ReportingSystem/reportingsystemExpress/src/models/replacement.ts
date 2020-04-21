import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table
export default class Replacement extends Model<Replacement> {
  @Index
    
  @Column
  absentee!: string;
  @Column
  substitute!: string;
  @Column
  monitoring!: boolean;
  @Column
  date!: Date;
  @Column
  shift!: boolean;
}
