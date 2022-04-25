// OrderItem Data Transfer Object schema.
import { IsNotEmpty } from 'class-validator'

export class OrderItemDto {

    @IsNotEmpty()
    readonly OrderId: number;

    @IsNotEmpty()
    readonly Basket: JSON;
    
    // @IsNotEmpty()
    // readonly IngredientId: number;
}