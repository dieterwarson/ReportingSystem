import {
    Table,
    Column,
    Model,
    Index,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import Custom from './custom'
import Report from './report';
import User from './user'
import FieldNames from './fieldnames';
  
  @Table
  export default class CustomEvent extends Model<CustomEvent> {
    @Index

    @ForeignKey(() => User)
    @Column
    authorId!: number;
    
    @BelongsTo(() => User)
    user!: User;
    
    @ForeignKey(() => Custom)
    @Column
    customId!: number;

    @BelongsTo(() => Custom)
    custom!: Custom;

    @ForeignKey(() => FieldNames)
    @Column
    FieldnameId!: number;

    @BelongsTo(() => FieldNames)
    fieldname!: FieldNames;

    @Column
    field1!: string;

    @Column
    field2!: string;

    @Column
    field3!: string;

    @Column
    field4!: string;

    @Column
    field5!: string;

    @Column
    field6!: string;

    @Column
    field7!: string;

    @Column
    field8!: string;

    @Column
    field9!: string;

    @Column
    field10!: string;
  }