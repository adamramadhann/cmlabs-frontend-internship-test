'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  
  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    
    if (pathname === '/ingredients' || pathname.startsWith('/category/') || pathname.startsWith('/ingredients/')) {
      router.replace(`${pathname}?${params.toString()}`);
    } else if (value && !pathname.startsWith('/meal/')) {
       router.push(`/ingredients?${params.toString()}`);
    }
  };

  const getPageTitle = () => {
    if (pathname === '/ingredients') return 'Dapur Bahan';
    if (pathname.startsWith('/ingredients/')) return 'Resep Bahan';
    if (pathname.startsWith('/category/')) return 'Kategori Spesial';
    if (pathname.startsWith('/meal/')) return 'Detail Resep';
    return 'Rama si Koki';
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-4 mb-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={onOpenSidebar}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-card border border-border shadow-sm text-primary hover:bg-accent transition-colors shrink-0"
          >
            <i className="fas fa-bars-staggered"></i>
          </button>
          
          <div className="hidden lg:block shrink-0">
            <h2 className="text-lg font-bold text-foreground leading-none">{getPageTitle()}</h2>
            <div className="flex items-center gap-2 text-[10px] text-muted font-medium uppercase tracking-wider mt-1">
              <span>Rama si Koki</span>
              <i className="fas fa-chevron-right text-[8px]"></i>
              <span className="text-primary">Dashboard</span>
            </div>
          </div>

          <div className="relative flex-1 max-w-md ml-0 md:ml-4">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted text-xs"></i>
            <input
              type="text"
              placeholder="Cari resep atau bahan..."
              value={searchValue}
              onChange={handleSearch}
              className="w-full bg-slate-100 border-none rounded-2xl pl-11 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted hover:text-primary hover:bg-accent transition-all text-xs font-bold border border-transparent hover:border-primary/10"
          >
            <i className="fas fa-home"></i>
            <span className="hidden sm:inline">KEMBALI KE WEBSITE</span>
          </Link>
          
          <div className="h-8 w-px bg-border hidden sm:block"></div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-orange-200 hover:scale-105 transition-all">
            <i className="fas fa-plus"></i>
            <span className="hidden xl:inline">RESEP BARU</span>
          </button>
        </div>
      </div>
    </header>
  );
}
