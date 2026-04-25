'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PropsBreadcrumb {
    mealName:  string;
    ingredientName: string;
}

export default function Breadcrumb({ mealName, ingredientName }: PropsBreadcrumb) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
      <Link href="/ingredients" className="hover:text-amberAccent transition">Beranda</Link>
      {segments[0] === 'ingredients' && segments[1] && (
        <>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-amberAccent">Bahan: {decodeURIComponent(segments[1])}</span>
        </>
      )}
      {segments[0] === 'meal' && segments[1] && (
        <>
          <i className="fas fa-chevron-right text-xs"></i>
          {ingredientName && (
            <>
              <Link href={`/ingredients/${encodeURIComponent(ingredientName)}`} className="hover:text-amberAccent">
                {ingredientName}
              </Link>
              <i className="fas fa-chevron-right text-xs"></i>
            </>
          )}
          <span className="text-amberAccent">{mealName}</span>
        </>
      )}
    </nav>
  );
}