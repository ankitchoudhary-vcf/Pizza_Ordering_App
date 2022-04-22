import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cart } from "../cart/cart.entity";
import { Ingredients } from "../ingredients/ingredients.entity";

@Table
export class CartItem extends Model<CartItem> {

    @ForeignKey(() => Cart)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    CartId: number;

    @ForeignKey(() => Ingredients)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    IngredientId: number;

    @BelongsTo(() => Cart)
    Cart: Cart;
    
    @BelongsTo(() => Ingredients)
    Ingredient: Ingredients;
}