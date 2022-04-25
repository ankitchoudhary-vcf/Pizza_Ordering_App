import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Ingredients } from "../ingredients/ingredients.entity";
import { Orders } from "../orders/orders.entity";

@Table
export class OrderItem extends Model<OrderItem> {

    @ForeignKey(() => Orders)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    OrderId: number;

    // @ForeignKey(() => Ingredients)
    // @Column({
    //     type: DataType.INTEGER,
    //     allowNull: false,
    // })
    // IngredientId: number;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    Basket : JSON;

    @BelongsTo(() => Orders)
    Order: Orders;
    
    // @BelongsTo(() => Ingredients)
    // Ingredient: Ingredients;
}