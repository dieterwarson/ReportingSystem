import {
    Table,
    Column,
    Model,
    Index,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import Report from './report';
  import User from './user';
  import CustomName from './customnames'
  
  @Table
  export default class CustomContent extends Model<CustomContent> {
    @Index
  
    @ForeignKey(() => User)
    @Column
    userId!: number;
  
    @BelongsTo(() => User)
    user!: User;
  
    @Column
    columnNameId!: number;

    @Column
    columnContent!: string;


  }
  