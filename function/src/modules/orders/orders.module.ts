import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { CartItemModule } from '../cartItem/cartItem.module';
import { OrderItemModule } from '../orderItem/orderItem.module';
import { OrdersController } from './orders.controller';
import { OrdersProvider } from './orders.providers';
import { OrdersService } from './orders.service';

@Module({
    imports : [OrderItemModule, CartModule, CartItemModule],
    providers: [OrdersService, ...OrdersProvider],
    exports: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
