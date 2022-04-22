import { Inject, Injectable } from "@nestjs/common";
import { ORDERS_REPOSITORY } from "src/core/constants";
import { OrderItem } from "../orderItem/orderItem.entity";
import { OrdersDto } from "./dto/orders.dto";
import { Orders } from "./orders.entity";

@Injectable()
export class OrdersService {
    constructor(@Inject(ORDERS_REPOSITORY) private readonly ordersRepository: typeof Orders){}

    // To creates a new Order into the Orders table and returns the newly created Order object.
    async create(order: OrdersDto, UserId): Promise<Orders> {
        return await this.ordersRepository.create<Orders>({...order, UserId});
    }

    // To fetch the Order from the Orders table
    async getData() {
        return await this.ordersRepository.findAll<Orders>()
    }

    // To fetch the Order from the Orders table by user id
    async fetch(UserId: number){
        return await this.ordersRepository.findAll<Orders>({where: {UserId: UserId}, include: [{model: OrderItem}]})
    }

    // To Truncate the Orders Table.
    async removeAll() {
        return await this.ordersRepository.truncate<Orders>({cascade: true})
    }
}
