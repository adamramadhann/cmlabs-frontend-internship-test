'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchAllIngredients } from '@/lib/api';
import IngredientCard from '@/components/IngredientCard';
import SkeletonGrid from '@/components/SkeletonGrid';
import { Ingredient } from '@/types/meal';

function IngredientsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [filtered, setFiltered] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllIngredients();
        setIngredients(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFiltered(ingredients);
    } else {
      setFiltered(
        ingredients.filter(ing =>
          ing.strIngredient.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, ingredients]);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Pilih <span className="text-primary">Bahan</span> Kamu
        </h1>
        <p className="text-muted mt-2">
          {query ? `Hasil pencarian untuk "${query}"` : 'Temukan inspirasi resep berdasarkan bahan pilihanmu.'}
        </p>
      </div>

      {loading ? (
        <SkeletonGrid count={12} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.slice(0, 100).map((ingredient, index) => (
              <div 
                key={ingredient.idIngredient} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <IngredientCard ingredient={ingredient} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 animate-scale-in">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold text-foreground">Bahan tidak ditemukan</h3>
              <p className="text-muted mt-2">Coba gunakan kata kunci lain.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function IngredientsPage() {
  return (
    <Suspense fallback={<SkeletonGrid count={12} />}>
      <IngredientsContent />
    </Suspense>
  );
}
