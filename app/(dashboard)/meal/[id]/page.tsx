import { fetchMealById } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function getYouTubeEmbedUrl(url: string | null) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export default async function MealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meal = await fetchMealById(id);
  if (!meal) notFound();

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ name: ingredient, measure: measure?.trim() || '' });
    }
  }

  const instructionsSteps = meal.strInstructions?.split(/\r?\n/)
    .filter(step => step.trim().length > 0)
    .map((step, idx) => ({ step: idx + 1, text: step }));

  const youtubeEmbed = getYouTubeEmbedUrl(meal.strYoutube);

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
      {/* Breadcrumb - Diperbarui: Beranda > Kategori > Detail */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
        <Link href="/ingredients" className="hover:text-primary transition-colors">Beranda</Link>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <Link href={`/category/${meal.strCategory}`} className="hover:text-primary transition-colors">
          {meal.strCategory}
        </Link>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span className="text-primary font-medium line-clamp-1">{meal.strMeal}</span>
      </nav>

      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-orange-100 border border-border">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex gap-2 mb-4">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {meal.strCategory}
            </span>
            <span className="bg-slate-100 text-muted text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {meal.strArea}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            {meal.strMeal}
          </h1>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-card p-4 rounded-2xl border border-border text-center">
              <i className="far fa-clock text-primary mb-2"></i>
              <p className="text-[10px] text-muted uppercase font-bold">Waktu</p>
              <p className="text-sm font-bold text-foreground">45 Min</p>
            </div>
            <div className="bg-card p-4 rounded-2xl border border-border text-center">
              <i className="fas fa-fire text-primary mb-2"></i>
              <p className="text-[10px] text-muted uppercase font-bold">Kalori</p>
              <p className="text-sm font-bold text-foreground">320 Kcal</p>
            </div>
            <div className="bg-card p-4 rounded-2xl border border-border text-center">
              <i className="fas fa-signal text-primary mb-2"></i>
              <p className="text-[10px] text-muted uppercase font-bold">Level</p>
              <p className="text-sm font-bold text-foreground">Mudah</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Ingredients */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-shopping-basket text-white text-sm"></i>
              </span>
              Bahan-bahan
            </h2>
            <ul className="space-y-4">
              {ingredients.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between pb-3 border-b border-dashed border-border last:border-0">
                  <span className="text-foreground font-medium">{item.name}</span>
                  <span className="text-primary font-bold text-sm bg-primary/5 px-2 py-0.5 rounded-md">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-list-ol text-white text-sm"></i>
              </span>
              Langkah Memasak
            </h2>
            <div className="space-y-8">
              {instructionsSteps?.map(({ step, text }) => (
                <div key={step} className="flex gap-6 relative">
                  <div className="flex-shrink-0 w-10 h-10 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center font-bold z-10 shadow-sm">
                    {step}
                  </div>
                  <div className="pt-2">
                    <p className="text-foreground leading-relaxed text-lg">{text}</p>
                  </div>
                  {step !== instructionsSteps.length && (
                    <div className="absolute left-5 top-10 bottom-[-32px] w-0.5 bg-border"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {youtubeEmbed && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <i className="fab fa-youtube text-white text-sm"></i>
                </span>
                Video Tutorial
              </h2>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border">
                <iframe
                  src={youtubeEmbed}
                  title={meal.strMeal}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
