import Link from 'next/link';
import { Ingredient } from '@/types/meal';

export default function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const imageUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient.strIngredient)}.png`;
  
  return (
    <Link href={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}`}>
      <div className="bg-card rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-orange-100/50 group">
        <div className="relative w-28 h-28 mb-4 bg-accent rounded-full flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300">
          <img
            src={imageUrl}
            alt={ingredient.strIngredient}
            className="object-contain w-full h-full drop-shadow-md"
          />
        </div>
        <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{ingredient.strIngredient}</h3>
        <p className="text-sm text-muted mt-2 line-clamp-2 leading-relaxed">
          {ingredient.strDescription || 'Jelajahi berbagai resep lezat yang menggunakan bahan ini.'}
        </p>
        <div className="mt-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Lihat Resep <i className="fas fa-arrow-right text-[10px]"></i>
        </div>
      </div>
    </Link>
  );
}
