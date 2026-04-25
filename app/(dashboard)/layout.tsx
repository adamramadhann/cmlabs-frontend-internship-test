'use client';
import { useState, Suspense } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col md:ml-72 transition-all duration-300">
        {/* Header dibungkus Suspense karena menggunakan useSearchParams */}
        <Suspense fallback={<header className="h-20 border-b border-border bg-background/80" />}>
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
        </Suspense>
        
        <main className="flex-1 p-4 md:p-8 pt-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="px-8 py-6 text-center text-muted text-[10px] font-medium uppercase tracking-widest border-t border-border/50">
          © 2024 RAMA SI KOKI RECIPE • ALL RIGHTS RESERVED
        </footer>
      </div>
    </div>
  );
}
