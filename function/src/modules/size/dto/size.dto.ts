// Size Data Transfer Object schema.
import { IsNotEmpty } from 'class-validator'

export class SizeDto {

    @IsNotEmpty()
    readonly Name: string;

    @IsNotEmpty()
    readonly Price: number;
}