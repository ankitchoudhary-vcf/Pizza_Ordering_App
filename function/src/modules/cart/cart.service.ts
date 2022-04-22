import { Inject, Injectable } from "@nestjs/common";
import { CART_REPOSITORY } from "src/core/constants";
import { CartItem } from "../cartItem/cartItem.entity";
import { Cart } from "./cart.entity";
import { CartDto } from "./dto/cart.dto";

@Injectable()
export class CartService {
    constructor(@Inject(CART_REPOSITORY) private readonly cartRepository: typeof Cart){}

    // To creates a new User into the users table and returns the newly created user object.
    async create(cart: CartDto, UserId): Promise<Cart> {
        return await this.cartRepository.create<Cart>({...cart, UserId});
    }

    // To fetch the cart from the Cart table
    async getData() {
        return await this.cartRepository.findAll<Cart>()
    }

    // To fetch the cart from the Cart table by user id
    async fetch(UserId: number){
        return await this.cartRepository.findAll<Cart>({where: {UserId: UserId}, include: [{model: CartItem}]})
    }

    // To remove cart by Id from the Cart table.
    async removeById(id: number) {
        return await this.cartRepository.destroy<Cart>({ where: { id}});
    }

    // To remove cart by UserId from the Cart table.
    async removeByUserId(userId: number) {
        return await this.cartRepository.destroy<Cart>({ where: { UserId: userId }});
    }

    // To find the Id from the Cart by userId.
    async getCartIdBYUserId(userId: number){
        return await this.cartRepository.findAll<Cart>({ attributes: ['id'], where: { UserId: userId}});
    }
}
