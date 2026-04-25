export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealDetail extends Meal {
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null; // For strIngredient1, strMeasure1, etc.
}
