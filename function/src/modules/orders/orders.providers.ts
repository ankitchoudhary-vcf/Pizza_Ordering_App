import { ORDERS_REPOSITORY } from "src/core/constants";
import { Orders } from "./orders.entity";

export const OrdersProvider = [{
    provide: ORDERS_REPOSITORY,
    useValue: Orders,
}]