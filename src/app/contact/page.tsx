import React from "react";

function contactPage() {
  return (
    <div className="bg-white min-h-screen">
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
      {/* Header */}
      <section className="py-20 px-8 bg-slate-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Hubungi <span className="text-emerald-600">Kami</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Punya pertanyaan tentang produk atau ingin bekerja sama? Kami siap
          membantu Anda.
        </p>
      </section>

      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info Kontak */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Informasi Kontak
              </h2>
              <p className="text-slate-600 mb-8">
                Jangan ragu untuk menghubungi saya melalui saluran di bawah ini.
                Saya akan berusaha membalas pesan Anda secepat mungkin.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-bold text-slate-900">
                    emailanda@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Lokasi</p>
                  <p className="font-bold text-slate-900">Medan, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-emerald-100 border border-slate-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    placeholder="Nama Anda"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Subjek
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    placeholder="Tujuan pesan"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="email@anda.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Pesan
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="Tuliskan pesan Anda..."
                ></textarea>
              </div>
              <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition duration-300">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default contactPage;
