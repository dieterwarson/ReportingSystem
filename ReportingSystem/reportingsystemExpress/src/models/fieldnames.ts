import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    Index,
  } from 'sequelize-typescript';
import CustomEvent from './customevent'

  
  @Table
  export default class FieldNames extends Model<FieldNames> {
    @Index

    @Column
    customName!: string;

    @Column
    name1!: string;

    @Column
    name2!: string;

    @Column
    name3!: string;

    @Column
    name4!: string;

    @Column
    name5!: string;

    @Column
    name6!: string;

    @Column
    name7!: string;

    @Column
    name8!: string;

    @Column
    name9!: string;

    @Column
    name10!: string;
  }