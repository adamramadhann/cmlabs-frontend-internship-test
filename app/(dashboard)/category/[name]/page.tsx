'use client';
import { useEffect, useState, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMealsByCategory } from '@/lib/api';
import MealCard from '@/components/MealCard';
import SkeletonGrid from '@/components/SkeletonGrid';
import { Meal } from '@/types/meal';

function CategoryContent({ name }: { name: string }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMealsByCategory(name);
        setMeals(data);
        setFilteredMeals(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

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
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <span>Kategori</span>
          <i className="fas fa-chevron-right text-[10px]"></i>
          <span className="text-primary font-medium">{name}</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Resep <span className="text-primary">{name}</span>
        </h1>
        <p className="text-muted mt-2">
          {query ? `Mencari "${query}" dalam kategori ${name}` : `Menampilkan koleksi resep terbaik untuk kategori ${name}`}
        </p>
      </div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeals.map((meal, index) => (
            <div 
              key={meal.idMeal} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <MealCard meal={meal} />
            </div>
          ))}
          {filteredMeals.length === 0 && (
            <div className="col-span-full py-20 text-center animate-scale-in">
              <i className="fas fa-utensils text-4xl text-muted/20 mb-4"></i>
              <p className="text-muted">Tidak ada resep ditemukan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  return (
    <Suspense fallback={<SkeletonGrid count={8} />}>
      <CategoryContent name={name} />
    </Suspense>
  );
}
