// OrderItem Data Transfer Object schema.
import { IsNotEmpty } from 'class-validator'

export class OrderItemDto {

    @IsNotEmpty()
    readonly OrderId: number;

    @IsNotEmpty()
    readonly IngredientId: number;
}