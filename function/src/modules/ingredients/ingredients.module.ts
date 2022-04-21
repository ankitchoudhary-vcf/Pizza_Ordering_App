import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsProvider } from './ingredients.providers';
import { IngredientsService } from './ingredients.service';

@Module({
    providers: [IngredientsService, ...IngredientsProvider],
    exports: [IngredientsService],
    controllers: [IngredientsController],
})
export class IngredientsModule {}
