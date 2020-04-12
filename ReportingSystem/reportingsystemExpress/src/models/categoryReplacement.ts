import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import Replacement from './replacement';

@Table
export default class CategoryReplacement extends Model<CategoryReplacement> {
  @Column
  administrativeId!: number;

  @Column
  replacementId!: number;
}


/* CategoryReplacement.hasMany(Replacement, {
  sourceKey: "administrativeId",
  foreignKey: "replacementId",
  as: "replacements",
}); */
