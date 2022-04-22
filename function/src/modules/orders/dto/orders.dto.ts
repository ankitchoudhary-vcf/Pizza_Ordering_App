// Order Data Transfer Object schema.
import { IsNotEmpty } from 'class-validator'

export class OrdersDto {

    @IsNotEmpty()
    readonly Price: number;
}