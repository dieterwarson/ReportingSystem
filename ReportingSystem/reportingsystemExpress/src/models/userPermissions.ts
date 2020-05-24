import { Table, Column, Model, Index } from 'sequelize-typescript';



@Table
export default class Permissions extends Model<Permissions> {
  @Index
    
  @Column
  name!: string;

  @Column
  makeReports!: boolean;

  @Column
  seeReports!: boolean;

  @Column
  seeNotifications!: boolean;

  @Column
  seePreviousShift!: boolean;

  @Column
  seeStatistics!: boolean;
}
