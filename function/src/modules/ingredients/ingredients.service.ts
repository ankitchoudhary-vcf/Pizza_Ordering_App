import { Inject, Injectable } from "@nestjs/common";
import { INGREDIENT_REPOSITORY } from "src/core/constants";
import { IngredientsDto } from "./dto/ingredients.dto";
import { Ingredients } from "./ingredients.entity";


@Injectable()
export class IngredientsService {
    
    constructor(@Inject(INGREDIENT_REPOSITORY) private readonly userRepository: typeof Ingredients){}

    // To creates a new Ingredient into the Ingredients table and returns the newly created Ingredient object.
    async create(Ingredient: IngredientsDto ): Promise<Ingredients> {
        return await this.userRepository.create<Ingredients>(Ingredient);
    }

    // To fetch the Ingredient from the Ingredients table
    async getData() {
        return await this.userRepository.findAll<Ingredients>()
    }

}