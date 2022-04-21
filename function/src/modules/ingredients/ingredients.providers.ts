import { Ingredients } from "./ingredients.entity";
import { INGREDIENT_REPOSITORY } from "src/core/constants";

export const IngredientsProvider = [{
    provide: INGREDIENT_REPOSITORY,
    useValue: Ingredients,
}]