// User Database Schema Model
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cart } from 'src/modules/cart/cart.entity';

/**
 * @Column decorator provides information about the each column in the table.
**/

@Table
export class Users extends Model<Users> {

    // Name Column
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    Name: string;


    // Email Column
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    Email: string;

    // Password Column
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    Password: string;

    @HasMany(() => Cart)
    Carts : Cart[];

}
