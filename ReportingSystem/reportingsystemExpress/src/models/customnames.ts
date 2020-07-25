import {
    Table,
    Column,
    Model,
    Index,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import Report from './report';
  
  @Table
  export default class CustomNames extends Model<CustomNames> {
    @Index
  
    @ForeignKey(() => Report)
    @Column
    reportId!: number;
  
    @BelongsTo(() => Report)
    report!: Report;
  
    @Column
    columnName!: string;

  }
  