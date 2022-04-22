import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { OrderItem } from "../orderItem/orderItem.entity";
import { Users } from "../users/users.entity";

@Table
export class Orders extends Model<Orders> {

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    UserId : number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    Price: number;

    @HasMany(() => OrderItem)
    OrderItem : OrderItem[];

    @BelongsTo(() => Users)
    user: Users;
}
