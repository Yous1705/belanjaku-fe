import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <span className="text-2xl font-bold text-emerald-600 tracking-tight">
          Belanja<span className="text-slate-800">ku</span>
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
      <header className="bg-slate-50 py-5 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Temukan barang Impianmu di{" "}
            <span className="text-emerald-600">Satu Tempat</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-md">
            Nikmati pengalaman belanja Online yang mudah, cepat dan aman dengan
            koleksi produk terlengkap
          </p>
          <div className="space-x-4 space-y-4">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:scale-105 transition">
              Belanja Sekarang
            </button>
            <button className="border border-slate-300 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-white transition">
              Lihat promo
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
          <div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] shadow-lg shadow-emerald-200">
            <Image
              src="/images/image.jpg"
              alt="Hero"
              fill
              className="object-cover rounded-[32px]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </header>

      {/* Section 1 */}
      <section className="bg-white py-24 px-8 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Kategori <span className="text-emerald-600">Populer</span>
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Kategori 1 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-lg shadow-slate-200">
              <Image
                src="/images/image.jpg"
                alt="Elektronik"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-8 left-0 right-0">
                <h3 className="text-white text-2xl font-bold">Elektronik</h3>
                <p className="text-emerald-300 text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  Lihat Koleksi →
                </p>
              </div>
            </div>
          </div>

          {/* Kategori 2 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-lg shadow-slate-200">
              <Image
                src="/images/image.jpg"
                alt="Fashion"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-8 left-0 right-0">
                <h3 className="text-white text-2xl font-bold">Fashion</h3>
                <p className="text-emerald-300 text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  Lihat Koleksi →
                </p>
              </div>
            </div>
          </div>

          {/* Kategori 3 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-lg shadow-slate-200">
              <Image
                src="/images/image.jpg"
                alt="Furniture"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-8 left-0 right-0">
                <h3 className="text-white text-2xl font-bold">Furniture</h3>
                <p className="text-emerald-300 text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  Lihat Koleksi →
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-slate-50 py-24 px-8 text-center overflow-hidden">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Flash <span className="text-emerald-600">Sale</span>
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition text-left">
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              {/* Product Image */}
              <img
                src="/images/image.jpg"
                className="w-full h-full object-cover"
              />

              {/* Discount */}
              <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                -30%
              </span>
            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-800">
                Laptop Legion 5I
              </h3>

              {/* Price Discount */}
              <div className="flex items-center gap-2">
                <span className="text-rose-500 font-bold text-lg">
                  Rp.120.000
                </span>
                <span className="text-sm text-slate-400 line-through">
                  Rp.180.000
                </span>
              </div>

              {/* Countdown */}
              <p className="text-xs text-slate-500">
                Berakhir dalam <span className="font-semibold">05:22:10</span>
              </p>

              {/* Progres Bar */}
              <div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                  <div className="bg-rose-500 h-2 rounded-full w-[80%]"></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Tersisa 8 dari 40</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition text-left">
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              {/* Product Image */}
              <img
                src="/images/image.jpg"
                className="w-full h-full object-cover"
              />

              {/* Discount */}
              <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                -30%
              </span>
            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-800">
                Laptop Legion 5I
              </h3>

              {/* Price Discount */}
              <div className="flex items-center gap-2">
                <span className="text-rose-500 font-bold text-lg">
                  Rp.120.000
                </span>
                <span className="text-sm text-slate-400 line-through">
                  Rp.180.000
                </span>
              </div>

              {/* Countdown */}
              <p className="text-xs text-slate-500">
                Berakhir dalam <span className="font-semibold">05:22:10</span>
              </p>

              {/* Progres Bar */}
              <div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                  <div className="bg-rose-500 h-2 rounded-full w-[80%]"></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Tersisa 8 dari 40</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition text-left">
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              {/* Product Image */}
              <img
                src="/images/image.jpg"
                className="w-full h-full object-cover"
              />

              {/* Discount */}
              <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                -30%
              </span>
            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-800">
                Laptop Legion 5I
              </h3>

              {/* Price Discount */}
              <div className="flex items-center gap-2">
                <span className="text-rose-500 font-bold text-lg">
                  Rp.120.000
                </span>
                <span className="text-sm text-slate-400 line-through">
                  Rp.180.000
                </span>
              </div>

              {/* Countdown */}
              <p className="text-xs text-slate-500">
                Berakhir dalam <span className="font-semibold">05:22:10</span>
              </p>

              {/* Progres Bar */}
              <div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                  <div className="bg-rose-500 h-2 rounded-full w-[80%]"></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Tersisa 8 dari 40</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-white py-24 px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Aman & <span className="text-emerald-600">Terpercaya</span>
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Fitur 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-.442-.255-.835-.63-1.022l-2.25-1.125a1.125 1.125 0 0 0-1.014 0l-2.25 1.125c-.375.187-.63.58-.63 1.022v3.938"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Gratis Ongkir
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Belanja sepuasnya tanpa pusing biaya kirim. Berlaku untuk
                seluruh wilayah Indonesia
              </p>
            </div>

            {/* Fitur 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                100% Original
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Semua produk kami kurasi langsung dari brand resmi untuk menjaga
                kepercayaan Anda.
              </p>
            </div>

            {/* Fitur 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Fast Respon
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Layanan CS kami siap membantu Anda 24/7 untuk menjawab setiap
                pertanyaan Anda.
              </p>
            </div>

            {/* Fitur 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Sistem Pembayaran yang aman
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Kami menggunakan sistem pembayaran yang aman dan terpercaya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonial */}
      <section className="bg-slate-50 py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Apa Kata <span className="text-emerald-600">Mereka?</span>
            </h2>
            <p className="text-slate-500 mt-4">
              Lebih dari 10.000+ pelanggan puas berbelanja di Belanjaku
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testi 1 */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "Pengirimannya cepet banget! Barang sampai dengan selamat dan
                kualitasnya bener-bener original. Gak nyesel langganan di sini."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Andi Saputra</h4>
                  <p className="text-xs text-slate-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "Mantap banget, barangnya original banget. Gak nyesel belanja di
                sini."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                  BG
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Belinda Gohar</h4>
                  <p className="text-xs text-slate-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "Awalnya ragu apakah aman atau tidak, ternyata sangat terpercaya
                dan aman. Barangnya original banget, kualitasnya juga
                memuaskan."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                  HP
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Herbet Panjaitan</h4>
                  <p className="text-xs text-slate-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "Respon yang cepat, barangnya original, dan kualitasnya bagus.
                Saya sangat puas dengan belanja di BelanjaKu. Terima kasih!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                  TS
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Toni Sirait</h4>
                  <p className="text-xs text-slate-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <span className="text-3xl font-bold text-white">
              Belanja<span className="text-emerald-400">ku</span>
            </span>
            <p className="text-sm leading-relaxed">
              Platform e-commerce terpercaya untuk semua kebutuhan gaya hidup
              Anda. Belanja aman, cepat, dan terpercaya.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer text-white">
                IG
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer text-white">
                FB
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer text-white">
                TW
              </div>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-bold mb-6">Belanja</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Semua Produk
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Kategori
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Promo Hari Ini
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold mb-6">Bantuan</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="/about" className="hover:text-emerald-400 transition">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-emerald-400 transition"
                >
                  Kontak
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-emerald-400 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">Dapatkan Promo</h4>
            <p className="text-sm mb-4">
              Berlangganan untuk info produk terbaru.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all">
                Gabung
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>© 2026 Belanjaku FE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
