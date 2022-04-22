import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CartService } from "../cart/cart.service";
import { cartItemService } from "../cartItem/cartItem.service";
import { orderItemService } from "../orderItem/orderItem.service";
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService,  private readonly orderItemService: orderItemService, private readonly cartService: CartService, private readonly cartItemService: cartItemService) {}

    @Get('fetch')
    async getCart() {
        return await this.ordersService.getData();
    }

    @Get('fetch/:id')
    async fetchCart(@Param('id') id: number) {
        return await this.ordersService.fetch(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    async addCart(@Body()  data , @Request() req) {
        const res = await this.ordersService.create(data, req.user.id);
        const OrderItems = data.OrderItem.map( Item => (
            {
                "IngredientId": Item.IngredientId,
                "OrderId": res.id
            }
        ))        
        OrderItems.forEach(async (item) => {
            return await this.orderItemService.create(item) 
        })
        const CartId = this.cartService.getCartIdBYUserId(req.user.id);
        await this.cartItemService.removeByCartIds((await CartId).map( Item => Item.id))
        await this.cartService.removeByUserId(req.user.id)

        return res;
    }


    @Get('remove')
    async removeAll(){
        return [await this.orderItemService.removeAll(), await this.ordersService.removeAll()]
    }

}