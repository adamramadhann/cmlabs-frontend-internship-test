'use client';
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Hanya muncul di grup dashboard */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col md:ml-72 transition-all duration-300">
        {/* Header - Hanya muncul di grup dashboard */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8 pt-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="px-8 py-6 text-center text-muted text-[10px] font-medium uppercase tracking-widest border-t border-border/50">
          © 2024 CHEF ADAM RECIPE • ALL RIGHTS RESERVED
        </footer>
      </div>
    </div>
  );
}
