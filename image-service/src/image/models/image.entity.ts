import {Table, Column, Model, DataType} from "sequelize-typescript";

export interface ImageBase {
    id: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({
    timestamps: true,
})
export class Image extends Model implements ImageBase {
    @Column({primaryKey: true, allowNull: false, type: DataType.STRING})
    public id: string;

    @Column({unique: true, allowNull: false, type: DataType.STRING})
    public url: string;
}
