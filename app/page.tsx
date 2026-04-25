import Link from 'next/link';

export default function LandingPage() {
  const whatsappNumber = "6285774799048";
  const whatsappMessage = encodeURIComponent("Halo Chef Rama, saya ingin tanya-tanya tentang resep dan kelas memasak.");

  return (
    <div className="h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] overflow-hidden selection:bg-orange-500 selection:text-white">
      
      {/* HEADER: Marquee dengan teks Bahasa Indonesia */}
      <header className="fixed top-0 left-0 w-full z-[100] px-4 py-8 md:px-12 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center bg-black/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden h-16 shadow-2xl">
          
          <div className="flex items-center gap-3 px-10 border-r border-white/10 h-full pointer-events-auto">
            <span className="font-serif italic text-2xl tracking-tighter">
              Rama Si <span className="text-orange-500 font-sans font-light not-italic tracking-widest ml-1">Chef</span>
            </span>
          </div>
          
          <div className="relative flex-1 flex overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee-right py-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <span className="mx-12 text-[9px] font-light uppercase tracking-[0.5em] text-gray-400">Seni Memasak</span>
                  <span className="w-1 h-1 bg-orange-600 rounded-full"></span>
                  <span className="mx-12 text-[9px] font-light uppercase tracking-[0.5em] text-gray-400">Resep Ikonik</span>
                  <span className="w-1 h-1 bg-orange-600 rounded-full"></span>
                  <span className="mx-12 text-[9px] font-light uppercase tracking-[0.5em] text-gray-400">Rahasia Dapur</span>
                  <span className="w-1 h-1 bg-orange-600 rounded-full"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 px-10 h-full">
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-orange-500/80">Tersedia Sekarang</span>
          </div>
        </div>
      </header>

      <main className="flex h-full items-center">
        <div className="flex flex-col lg:flex-row w-full h-full">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col justify-center px-12 lg:px-24 bg-[#0A0A0A] relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 blur-[150px] rounded-full"></div>
            
            <div className="max-w-2xl z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              <h1 className="text-5xl lg:text-[90px] leading-[0.95] tracking-tight mb-10 font-light">
                Ciptakan Setiap <br />
                <span className="font-serif italic text-orange-500">Mahakarya.</span>
              </h1>
              
              <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-md font-light">
                Memasak bukan hanya soal rasa, tapi soal cerita. Temukan teknik kurasi yang mengubah bahan sederhana menjadi pengalaman tak terlupakan.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="http://localhost:3000/ingredients" 
                  className="group relative px-12 py-5 bg-orange-600 text-white hover:text-orange-600 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(234,88,12,0.2)] flex items-center justify-center gap-4"
                >
                  <span className="relative z-10 font-medium tracking-widest text-sm uppercase">Jelajahi Resep</span>
                  <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500">→</span>
                </Link>

                <Link 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  className="px-12 py-5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-3"
                >
                  <i className="fab fa-whatsapp"></i>
                  Hubungi Chef
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:block flex-1 relative bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent z-10 w-64"></div>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1500" 
              alt="Seni Kuliner" 
              className="w-full h-full object-cover opacity-50 sepia-[20%] transition-all duration-1000 group-hover:opacity-70"
            />
            
            <div className="absolute bottom-16 right-16 z-20 animate-float">
              <div className="bg-white/[0.03] backdrop-blur-3xl p-12 rounded-[3rem] border border-white/10 max-w-sm">
                <p className="text-2xl font-serif italic text-gray-200 leading-relaxed">
                  "Masakan adalah bahasa universal yang menyatukan hati."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-8 h-px bg-orange-500"></div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-bold">Adam Ramadhan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}