import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { cartItemService } from "../cartItem/cartItem.service";
import { CartService } from "./cart.service";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService,  private readonly cartItemService: cartItemService) {}

    @Get('fetch')
    async getCart() {
        return await this.cartService.getData();
    }

    @Get('fetch/:id')
    async fetchCart(@Param('id') id: number) {
        return await this.cartService.fetch(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    async addCart(@Body()  data , @Request() req) {
        const res = await this.cartService.create(data, req.user.id);
        const CartItems = data.CartItems.map( Item => (
            {
                "IngredientId": Item.IngredientId,
                "CartId": res.id
            }
        ))        
        CartItems.forEach(async (item) => {
            return await this.cartItemService.create(item) 
        })

        return res;
    }

    @Patch('remove/:id')
    async removeCart(@Param('id') id) {
        return [await this.cartService.removeById(id), await this.cartItemService.removeByCartId(id)]
    }
}