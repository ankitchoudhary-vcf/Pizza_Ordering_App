import { Inject, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { CARTITEM_REPOSITORY } from "src/core/constants";
import { CartItem } from "./cartItem.entity";

@Injectable()
export class cartItemService {
    constructor(@Inject(CARTITEM_REPOSITORY) private readonly cartItemRepository: typeof CartItem){}

    // To creates a new User into the users table and returns the newly created user object.
    async create(cartItems): Promise<CartItem> {
        return await this.cartItemRepository.create<CartItem>(cartItems);
    }

    // To remove cartItem by CartId from CartItem table.
    async removeByCartId(id: number) {
        return await this.cartItemRepository.destroy<CartItem>({ where: { CartId:id}})
    }

    // To remove cartItems by CartId from CartItem table.
    async removeByCartIds(CartId) {
        return await this.cartItemRepository.destroy<CartItem>({ where: { CartId: { [Op.or]: CartId } }})
    }

}
