import { Sequelize } from 'sequelize-typescript';
import { Cart } from 'src/modules/cart/cart.entity';
import { CartItem } from 'src/modules/cartItem/cartItem.entity';
import { Ingredients } from 'src/modules/ingredients/ingredients.entity';
import { OrderItem } from 'src/modules/orderItem/orderItem.entity';
import { Orders } from 'src/modules/orders/orders.entity';
import { Users } from 'src/modules/users/users.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Users, Ingredients, Cart, CartItem, Orders, OrderItem]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
