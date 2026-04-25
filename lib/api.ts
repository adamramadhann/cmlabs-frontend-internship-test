import { Category, Ingredient, Meal, MealDetail } from "@/types/meal";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchAllIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/list.php?i=list`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories.php`);
  const data = await res.json();
  return data.categories || [];
}

export async function fetchMealsByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealsByIngredient(ingredient: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealById(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}