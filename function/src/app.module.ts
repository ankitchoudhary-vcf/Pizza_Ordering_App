import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cartItem/cartItem.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemModule } from './modules/orderItem/orderItem.module';
import { SizeModule } from './modules/size/size.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    IngredientsModule,
    CartModule,
    CartItemModule,
    OrdersModule,
    OrderItemModule,
    SizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
