import { Category, Ingredient, Meal, MealDetail } from "@/types/meal";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchAllIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/list.php?i=list`, { next: { revalidate: 86400 } }); // Cache for 24 hours
  const data = await res.json();
  return data.meals || [];
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories.php`, { next: { revalidate: 86400 } }); // Cache for 24 hours
  const data = await res.json();
  return data.categories || [];
}

export async function fetchMealsByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`, { next: { revalidate: 3600 } }); // Cache for 1 hour
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealsByIngredient(ingredient: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`, { next: { revalidate: 3600 } }); // Cache for 1 hour
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealById(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`, { next: { revalidate: 3600 } }); // Cache for 1 hour
  const data = await res.json();
  return data.meals?.[0] || null;
}