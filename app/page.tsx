import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const whatsappNumber = "6285774799048";
  const whatsappMessage = encodeURIComponent("Halo Chef Rama, saya ingin tanya-tanya tentang resep dan kelas memasak.");
  const marqueeItems = ["Seni Memasak", "Resep Ikonik", "Rahasia Dapur", "Teknik Masak", "Kelas Kuliner", "Cita Rasa Nusantara"];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0A0A0A] text-[#F5F5F5] selection:bg-orange-500 selection:text-white">

      <header className="fixed top-0 left-0 w-full z-[100] px-3 py-4 sm:px-6 sm:py-5 md:px-10">
        <div className="max-w-[1400px] mx-auto flex items-center bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] rounded-full h-12 sm:h-16 overflow-hidden">

          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-7 border-r border-white/[0.07] h-full flex-shrink-0">
            <span className="w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] rounded-full bg-orange-500 animate-pulse" />
            <span className="font-serif italic text-sm sm:text-lg text-[#F5F5F5] tracking-tight whitespace-nowrap">
              Rama Si
              <span className="font-sans not-italic font-light text-[7px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.35em] text-orange-500 uppercase ml-1 sm:ml-1.5 align-middle">
                Chef
              </span>
            </span>
          </div>

          {/* Marquee */}
          <div className="relative flex-1 min-w-0 overflow-hidden h-full flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 z-10 bg-gradient-to-r from-[#0D0D0D] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-10 z-10 bg-gradient-to-l from-[#0D0D0D] to-transparent pointer-events-none" />
            <div className="flex whitespace-nowrap animate-marquee-right">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center" aria-hidden={copy === 1 ? true : undefined}>
                  {marqueeItems.map((label) => (
                    <span key={label} className="flex items-center gap-4 sm:gap-8 px-4 sm:px-8">
                      <span className="text-[7px] sm:text-[9px] font-light uppercase tracking-[0.35em] sm:tracking-[0.4em] text-white/30">
                        {label}
                      </span>
                      <span className="w-[3px] h-[3px] rounded-full bg-orange-600/50 flex-shrink-0" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center px-3 sm:px-6 border-l border-white/[0.07] h-full flex-shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-orange-600/[0.08] border border-orange-500/20 rounded-full px-2.5 sm:px-3 py-1.5">
              <span className="w-[5px] h-[5px] rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
              <span className="hidden sm:inline text-[8px] font-medium uppercase tracking-[0.3em] text-orange-500/80">
                Tersedia
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN — stack mobile, side-by-side desktop */}
      <main className="flex flex-col lg:flex-row lg:min-h-screen">

        {/* LEFT — Hero Content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-20 xl:px-28 pt-28 sm:pt-32 pb-10 lg:pb-0 lg:py-0 bg-[#0A0A0A] relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-orange-600/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-xl z-10">

            {/* Tag */}
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/50">
                Kuliner Autentik
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[84px] leading-[0.95] tracking-tight mb-6 sm:mb-8 font-light">
              Ciptakan Setiap <br />
              <span className="font-serif italic text-orange-500">Mahakarya.</span>
            </h1>

            <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-8 sm:mb-10 font-light max-w-md">
              Memasak bukan hanya soal rasa, tapi soal cerita. Temukan teknik kurasi yang mengubah bahan sederhana menjadi pengalaman tak terlupakan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/ingredients"
                className="group relative px-8 py-4 bg-orange-600 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(234,88,12,0.25)] flex items-center justify-center gap-3"
              >
                <span className="relative z-10 font-medium tracking-widest text-xs uppercase transition-colors duration-500 group-hover:text-orange-600">
                  Jelajahi Resep
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-orange-600">→</span>
              </Link>

              <Link
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-3"
              >
                <i className="fab fa-whatsapp" style={{ fontSize: 14 }} />
                Hubungi Chef
              </Link>
            </div>

            {/* Stats — mobile only */}
            <div className="flex items-center gap-8 mt-10 lg:hidden">
              {[["120+", "Resep"], ["4.9", "Rating"], ["500+", "Murid"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-xl font-light text-white/90">{num}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT — Image Panel */}
        <div className="relative w-full h-64 sm:h-80 lg:w-[45%] lg:h-auto lg:min-h-screen bg-black overflow-hidden flex-shrink-0">
          <div className="absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 lg:hidden" />

          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1500"
            alt="Seni Kuliner Chef Rama"
            fill
            priority
            className="object-cover opacity-50"
          />

          {/* Quote card — desktop only */}
          <div className="hidden lg:block absolute bottom-14 right-12 z-20">
            <div className="bg-white/[0.03] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 max-w-xs">
              <p className="text-xl font-serif italic text-white/80 leading-relaxed">
                "Masakan adalah bahasa universal yang menyatukan hati."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-6 h-px bg-orange-500" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-orange-500 font-medium">
                  Adam Ramadhan
                </span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}