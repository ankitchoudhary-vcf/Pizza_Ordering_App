import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { cartItemService } from "../cartItem/cartItem.service";
import { CartService } from "./cart.service";

// To handle api/cart API requests
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService,  private readonly cartItemService: cartItemService) {}

    // To fetch cart for the authenticated user or by user id
    @UseGuards(AuthGuard('jwt'))
    @Get('fetch')
    async fetchCart(@Request() req) {
        return await this.cartService.fetch(req.user.id);
    }

    // To add new cart
    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    async addCart(@Body()  data , @Request() req) {
        const res = await this.cartService.create(data, req.user.id);
        const CartItems = data.CartItems.map( (Item: { IngredientId: number; }) => (
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

    // To remove the cart and cartItem from Cart and CartItem table respectively.
    @Patch('remove/:id')
    async removeCart(@Param('id') id) {
        return [await this.cartService.removeById(id), await this.cartItemService.removeByCartId(id)]
    }
}