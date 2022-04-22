import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CartItem } from "../cartItem/cartItem.entity";
import { Users } from "../users/users.entity";

@Table
export class Cart extends Model<Cart> {

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

    @HasMany(() => CartItem)
    CartItems : CartItem[];

    @BelongsTo(() => Users)
    user: Users;
}
