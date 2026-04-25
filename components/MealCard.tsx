import Link from 'next/link';
import { Meal } from '@/types/meal';

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <Link href={`/meal/${meal.idMeal}`}>
      <div className="group bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-orange-100/50 hover:-translate-y-1">
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-primary">
              <i className="far fa-heart text-sm"></i>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-foreground font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
            {meal.strMeal}
          </h3>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-[10px] text-muted font-medium bg-slate-100 px-2 py-1 rounded-md">
              <i className="far fa-clock"></i>
              <span>30 Mins</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted font-medium bg-slate-100 px-2 py-1 rounded-md">
              <i className="fas fa-fire"></i>
              <span>Medium</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
