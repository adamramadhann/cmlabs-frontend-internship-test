# Struktur Proyek - Rama si Koki

Dokumen ini menjelaskan struktur folder dan arsitektur aplikasi Rama si Koki yang dibangun menggunakan Next.js 15 (App Router).

## Arsitektur Folder

```text
/
├── app/                    # Folder utama Next.js (App Router)
│   ├── layout.tsx          # Root layout (Setup HTML, Font, SEO Global)
│   ├── page.tsx            # Landing Page Utama
│   ├── globals.css         # Konfigurasi Tailwind & Style Global
│   └── (dashboard)/        # Route Group untuk Dashboard (dengan Sidebar)
│       ├── layout.tsx      # Layout khusus Dashboard (Sidebar + Header Sticky)
│       ├── ingredients/    # Halaman daftar bahan masakan
│       ├── category/       # Halaman filter berdasarkan kategori
│       └── meal/           # Halaman detail resep masakan
├── components/             # Komponen UI Reusable
│   ├── Sidebar.tsx         # Navigasi samping (Responsive)
│   ├── Header.tsx          # Header dengan Fitur Search Global
│   ├── MealCard.tsx        # Kartu tampilan resep
│   └── IngredientCard.tsx  # Kartu tampilan bahan
├── lib/                    # Utilitas & Integrasi API
│   └── api.ts              # Fetching data dari TheMealDB API
├── public/                 # Aset statis (Logo, Icon, Image)
│   └── logo-rsk.svg        # Logo Brand "Rama si Koki"
├── types/                  # Definisi Type data TypeScript
│   └── meal.ts             # Interface untuk Meal, Category, Ingredient
└── docs/                   # Dokumentasi teknis proyek
```

## Konsep Utama

### 1. Route Groups `(dashboard)`
Kami menggunakan Route Groups untuk memisahkan UI antara **Landing Page** dan **Dashboard**. 
- Halaman di dalam `(dashboard)` secara otomatis menggunakan `layout.tsx` yang memiliki Sidebar.
- Halaman utama `page.tsx` berada di luar group sehingga memiliki tampilan full-screen yang bersih.

### 2. Global Search State via URL
Pencarian tidak disimpan dalam state lokal React yang hilang saat refresh, melainkan menggunakan Query Parameter `?q=...`. Ini memungkinkan:
- Link hasil pencarian bisa dibagikan (shareable).
- Tombol "Back" browser berfungsi normal untuk kembali ke hasil pencarian sebelumnya.

### 3. Responsive Design
- **Mobile First:** Sidebar disembunyikan dan muncul sebagai "drawer" dari kiri saat tombol menu ditekan.
- **Sticky Header:** Memudahkan akses pencarian di manapun posisi scroll pengguna.

### 4. Branding & SEO
- Menggunakan Brand **Rama si Koki**.
- SEO dioptimasi menggunakan Metadata API Next.js di `app/layout.tsx` untuk target audiens Indonesia.
