// CartItem Data Transfer Object schema.
import { IsNotEmpty } from 'class-validator'

export class CartItemDto {

    @IsNotEmpty()
    readonly CartId: number;

    @IsNotEmpty()
    readonly IngredientId: number;
}