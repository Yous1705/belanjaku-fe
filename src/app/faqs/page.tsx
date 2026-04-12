import React from "react";

const faqs = [
  {
    q: "Teknologi apa yang digunakan untuk membangun Belanjaku?",
    a: "Proyek ini dibangun menggunakan Next.js (React) untuk Frontend, Tailwind CSS untuk styling, dan Prisma ORM untuk manajemen database. Backend-nya ditenagai oleh NestJS untuk memastikan arsitektur yang scalable.",
  },
  {
    q: "Bagaimana sistem autentikasi di implementasikan?",
    a: "Autentikasi dibangun menggunakan JWT (JSON Web Token) atau NextAuth.js, mencakup fitur Register, Login, serta pengamanan route (Middleware) untuk membedakan akses antara user biasa dan admin.",
  },
  {
    q: "Apakah proyek ini mendukung integrasi pembayaran?",
    a: "Ya, Belanjaku dirancang untuk siap diintegrasikan dengan Payment Gateway seperti Midtrans. Alur checkout sudah disiapkan untuk menangani status transaksi secara real-time melalui webhook.",
  },
  {
    q: "Bagaimana cara mengelola data produk dalam proyek ini?",
    a: "Data dikelola secara dinamis melalui PostgreSQL. Saya menggunakan Prisma sebagai jembatan untuk melakukan operasi CRUD, relasi antar tabel (seperti kategori ke produk), dan validasi data sebelum disimpan ke database.",
  },
  {
    q: "Apa tantangan terbesar saat mengerjakan proyek ini?",
    a: "Tantangan utamanya adalah memastikan sinkronisasi antara state di frontend dengan database backend, serta mengoptimalkan performa gambar menggunakan komponen Next/Image agar loading page tetap cepat.",
  },
];
function faqsPage() {
  return (
    <div>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <span className="text-2xl font-bold text-emerald-600 tracking-tight">
          <a href="/">Belanja</a>
          <span className="text-slate-800">ku</span>
        </span>
        <div className="flex gap-4">
          <a
            href="/auth/login"
            className="px-5 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-full transition-all"
          >
            Login
          </a>
          <a
            href="/auth/register"
            className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all"
          >
            Register
          </a>
        </div>
      </nav>
      <section className="py-24 px-8 bg-white max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest">
            Technical Info
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
            Detail <span className="text-emerald-600">Pengembangan</span>
          </h2>
          <p className="text-slate-500 mt-4 italic">
            Pertanyaan umum mengenai arsitektur dan teknis pembuatan proyek ini.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <details
              key={index}
              className="group border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 open:shadow-md"
            >
              <summary className="flex justify-between items-center font-bold text-slate-800 p-6 cursor-pointer list-none hover:bg-emerald-50/30 transition-colors">
                <span className="pr-4">{item.q}</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed bg-slate-50/50">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

export default faqsPage;
