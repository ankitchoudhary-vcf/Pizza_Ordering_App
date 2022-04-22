import { Module } from '@nestjs/common';
import { CartItemModule } from '../cartItem/cartItem.module';
import { CartController } from './cart.controller';
import { CartProvider } from './cart.providers';
import { CartService } from './cart.service';

@Module({
    imports : [CartItemModule],
    providers: [CartService, ...CartProvider],
    exports: [CartService],
    controllers: [CartController],
})
export class CartModule {}
