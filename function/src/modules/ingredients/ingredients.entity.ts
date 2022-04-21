import { Column, DataType, Model, Table } from "sequelize-typescript";

// Ingredients Table
@Table
export class Ingredients extends Model<Ingredients> {

    // IngredientName column
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    Name: string;

    // IngredientType column
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    Type: string;

    // IngredientPrice column
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    Price: number;

    // IngredientAvatarURL column
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    AvatarURL: string;
}
