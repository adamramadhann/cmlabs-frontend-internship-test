'use client';
import { useEffect, useState, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMealsByIngredient } from '@/lib/api';
import MealCard from '@/components/MealCard';
import SkeletonGrid from '@/components/SkeletonGrid';
import { Meal } from '@/types/meal';

function IngredientDetailContent({ ingredient }: { ingredient: string }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const decodedIngredient = decodeURIComponent(ingredient);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMealsByIngredient(ingredient);
        setMeals(data);
        setFilteredMeals(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (ingredient) load();
  }, [ingredient]);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredMeals(meals);
    } else {
      setFilteredMeals(
        meals.filter(meal =>
          meal.strMeal.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, meals]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <span>Bahan</span>
          <i className="fas fa-chevron-right text-[10px]"></i>
          <span className="text-primary font-medium">{decodedIngredient}</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Resep dengan <span className="text-primary">{decodedIngredient}</span>
        </h1>
        <p className="text-muted mt-2">
          {query ? `Mencari "${query}" dalam resep ${decodedIngredient}` : `Ditemukan ${filteredMeals.length} inspirasi masakan lezat`}
        </p>
      </div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
          {filteredMeals.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <i className="fas fa-utensils text-4xl text-muted/20 mb-4"></i>
              <p className="text-muted">Tidak ada resep ditemukan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function IngredientDetailPage({ params }: { params: Promise<{ ingredient: string }> }) {
  const { ingredient } = use(params);
  return (
    <Suspense fallback={<SkeletonGrid count={8} />}>
      <IngredientDetailContent ingredient={ingredient} />
    </Suspense>
  );
}
