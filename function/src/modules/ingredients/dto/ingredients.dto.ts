// Ingredients Data Transfer Object schema.
import { IsNotEmpty } from 'class-validator'

export class IngredientsDto {

    @IsNotEmpty()
    readonly Name: string;

    @IsNotEmpty()
    readonly Price: number;

    @IsNotEmpty()
    readonly AvatarURL: string;
}