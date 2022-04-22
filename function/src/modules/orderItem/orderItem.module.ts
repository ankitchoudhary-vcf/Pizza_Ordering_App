import { Module } from '@nestjs/common';
import { OrderItemProvider } from './orderItem.providers';
import { orderItemService } from './orderItem.service';

@Module({
    providers: [orderItemService, ...OrderItemProvider],
    exports: [orderItemService],
})
export class OrderItemModule {}
