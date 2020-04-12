import {Table, Column, Model, Index, HasMany} from 'sequelize-typescript';
import Replacement from './replacement';

@Table
export default class CategoryReplacement extends Model<CategoryReplacement> {
  @Index

  @Column
  replacementId!: number;
}


/* CategoryReplacement.hasMany(Replacement, {
  sourceKey: "administrativeId",
  foreignKey: "replacementId",
  as: "replacements",
}); */
