import { CARTITEM_REPOSITORY } from "src/core/constants";
import { CartItem } from "./cartItem.entity";

export const CartItemProvider = [{
    provide: CARTITEM_REPOSITORY,
    useValue: CartItem,
}]