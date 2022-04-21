import { Body, Controller, Get, Post } from '@nestjs/common';
import { IngredientsDto } from './dto/ingredients.dto';
import { IngredientsService } from './ingredients.service';


// handle api/ingredients
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  // handle api/ingredients/fetch
  // To fetch the list of ingredients from the Ingredients table
  @Get('fetch')
  async getIngredient() {
      return await this.ingredientsService.getData();
  }

  // handle api/ingredients/add
  // To add a new ingredient to the Ingredients table
  @Post('add')
  async addIngredient(@Body() data: IngredientsDto) {
    return await this.ingredientsService.create(data)
  }

}
