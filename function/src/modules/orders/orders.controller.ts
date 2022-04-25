import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CartService } from "../cart/cart.service";
import { cartItemService } from "../cartItem/cartItem.service";
import { orderItemService } from "../orderItem/orderItem.service";
import { OrdersService } from "./orders.service";

// To handle api/orders API.
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService,  private readonly orderItemService: orderItemService, private readonly cartService: CartService, private readonly cartItemService: cartItemService) {}

    // To fetch Orders from Orders table by user Id
    @UseGuards(AuthGuard('jwt'))
    @Get('fetch')
    async fetchOrder(@Request() req) {
        return await this.ordersService.fetch(req.user.id);
    }

    // To add new order
    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    async addOrder(@Body()  data , @Request() req) {
        const res = await this.ordersService.create(data, req.user.id);
        const OrderItems = data.OrderItem.map( Item =>  (
            {
                "Basket": Item,
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


    // To remove all orders and orderItems
    @Get('remove')
    async removeAll(){
        return [await this.orderItemService.removeAll(), await this.ordersService.removeAll()]
    }

}