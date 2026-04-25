'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchCategories } from '@/lib/api';
import { Category } from '@/types/meal';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // WhatsApp Config
  const whatsappNumber = "6285774799048";
  const whatsappMessage = encodeURIComponent("Halo Chef Adam, saya ingin bertanya tentang resep.");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Gagal mengambil kategori:', error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname]);

  const navItemClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
    ${pathname === path 
      ? 'bg-primary text-white font-medium shadow-md shadow-orange-200' 
      : 'text-muted hover:bg-accent hover:text-primary'}
  `;

  const subNavItemClass = (path: string) => `
    flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200
    ${pathname === path 
      ? 'bg-accent text-primary font-semibold' 
      : 'text-muted hover:text-primary hover:translate-x-1'}
  `;

  return (
    <>
      {/* Overlay Mobile */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`
        fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-40 p-6 flex flex-col
        transition-transform duration-300 ease-in-out shadow-xl md:shadow-none md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Header / Brand */}
        <div className="flex items-center justify-between mb-10 px-2 shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
               <i className="fas fa-utensils text-white"></i>
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight leading-none italic font-serif">
              Rama Si <br/><span className="text-primary not-italic font-sans tracking-widest">Chef</span>
            </h1>
          </Link>
          <button onClick={onClose} className="md:hidden text-muted hover:text-primary transition-colors p-2">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          <p className="text-[10px] uppercase tracking-[2px] font-bold text-muted/50 px-4 mb-2">Menu Utama</p>
          
          <Link href="/ingredients" className={navItemClass('/ingredients')}>
            <i className="fas fa-carrot w-5 text-center"></i>
            <span>Bahan Masakan</span>
          </Link>

          <div className="pt-4">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-muted hover:text-primary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <i className="fas fa-th-large w-5 text-center"></i>
                <span className="font-medium">Kategori</span>
              </div>
              <i className={`fas fa-chevron-right text-[10px] transition-transform duration-300 ${isCategoryOpen ? 'rotate-90' : ''}`}></i>
            </button>

            {isCategoryOpen && (
              <div className="mt-2 ml-4 pl-4 border-l-2 border-border space-y-1">
                {loading ? (
                  <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-muted animate-pulse">Memuat...</div>
                ) : (
                  categories.map((cat, index) => (
                    <Link 
                      key={cat.idCategory} 
                      href={`/category/${cat.strCategory}`}
                      className={`${subNavItemClass(`/category/${cat.strCategory}`)}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span>{cat.strCategory}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Footer Card: Hubungi Chef */}
        <div className="mt-auto pt-6 shrink-0">
          <div className="bg-accent p-5 rounded-2xl border border-primary/10 relative overflow-hidden group">
            {/* Dekorasi lingkaran transparan */}
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <p className="text-[10px] uppercase tracking-widest text-primary font-black mb-1 relative z-10">Bantuan Chef</p>
            <p className="text-[10px] text-muted leading-relaxed relative z-10 mb-4">Punya pertanyaan seputar resep atau teknik memasak?</p>
            
            <Link 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              className="w-full py-2.5 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm hover:shadow-orange-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 relative z-10"
            >
              <i className="fab fa-whatsapp text-sm"></i>
              HUBUNGI SEKARANG
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}