import { ORDERITEM_REPOSITORY } from "src/core/constants";
import { OrderItem } from "./orderItem.entity";

export const OrderItemProvider = [{
    provide: ORDERITEM_REPOSITORY,
    useValue: OrderItem,
}]