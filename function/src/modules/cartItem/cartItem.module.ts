import { Module } from '@nestjs/common';
import { CartItemProvider } from './cartItem.providers';
import { cartItemService } from './cartItem.service';

@Module({
    providers: [cartItemService, ...CartItemProvider],
    exports: [cartItemService],
})
export class CartItemModule {}
