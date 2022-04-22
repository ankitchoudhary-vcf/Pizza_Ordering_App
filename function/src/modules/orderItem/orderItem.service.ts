import { Inject, Injectable } from "@nestjs/common";
import { ORDERITEM_REPOSITORY } from "src/core/constants";
import { OrderItem } from "./orderItem.entity";

@Injectable()
export class orderItemService {
    constructor(@Inject(ORDERITEM_REPOSITORY) private readonly orderItemRepository: typeof OrderItem){}

    // To creates a new orderItem into the OrderItem table and returns the newly created user object.
    async create(orderItems): Promise<OrderItem> {
        return await this.orderItemRepository.create<OrderItem>(orderItems);
    }

    // To truncate a orderItem table.
    async removeAll() {
        return await this.orderItemRepository.truncate<OrderItem>({cascade: true});
    }

}
