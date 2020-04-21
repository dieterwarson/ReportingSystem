import {Table, Column, Model, Index, ForeignKey, HasMany} from "sequelize-typescript";

@Table
export default class DummyDatabase extends Model<DummyDatabase> {
    @Index
    
    @Column
    plNumber!: string;

    @Column
    unit !: string;

    @Column
    location!: string

    @Column
    date!: Date

    @Column
    actions!: string

}