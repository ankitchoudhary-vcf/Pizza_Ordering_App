
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Size extends Model<Size> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    Name: string;


    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    Price: number;
}
