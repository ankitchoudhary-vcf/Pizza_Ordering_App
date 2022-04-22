// User Data Transfer Object schema.
import { IsNotEmpty } from 'class-validator'

export class CartDto {

    @IsNotEmpty()
    readonly CartId: number;

    @IsNotEmpty()
    readonly IngredientId: number;
}