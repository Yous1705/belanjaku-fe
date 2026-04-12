import React from "react";
import Image from "next/image";

function aboutMePage() {
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
      <section className="py-20 px-8 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">
            Halo, saya <span className="text-emerald-600">Pengembang</span> di
            balik Belanjaku
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Seorang Software Engineer yang antusias membuat hal-hal menarik yang
            fungsional dan menyenangkan bagi pengguna.
          </p>
        </div>
      </section>

      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 ">
              Mengenal Saya Lebih Dekat
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Saya{" "}
              <span className="text-emerald-600 font-extrabold">
                Yous Sibarani
              </span>{" "}
              adalah seorang{" "}
              <span className="text-emerald-600 font-bold">
                Software Engineer{" "}
              </span>{" "}
              yang memiliki minat besar dalam dunia{" "}
              <span className="text-emerald-600 font-bold">
                Fullstack Development.{" "}
              </span>
              Bagi saya, pemograman bukan sekadar menulis baris kode, tapi cara
              untuk memecahkan masalah nyata melalui kreativitas dan teknologi
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl shadow-emerald-100 border-8 border-white">
              <Image
                src="/images/image.jpg"
                alt="saya"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Misi & Tujuan Proyek
            </h2>
            <p className="text-slate-600 leading-relaxed">
              <span className="text-emerald-600 font-bold">Belanja</span>
              {""}
              <span className="text-slate-900 font-bold">ku </span> lahir
              sebagai proyek personal untuk memperdalam pemahaman saya dalam
              membangun aplikasi e-commerce yang kompleks. Fokus utama saya
              adalah:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>
                  Mengasah kemampuan dalam manajemen database dengan{" "}
                  <span className="text-emerald-600 font-bold">Prisma ORM</span>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>
                  Membangun UI yang responsif dan interaktif menggunakan
                  <span className="text-emerald-600 font-bold">
                    Tailwind CSS
                  </span>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>
                  Menambahkan portofolio nyata yang menunjukkan dedikasi saya
                  dalam bekerja.
                </span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-xl">
              {/* Gambar ilustrasi koding atau workspace */}
              <Image
                src="/images/image.jpg"
                alt="Workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto bg-emerald-600 rounded-[40px] p-12 text-white shadow-2xl shadow-emerald-200">
          <h2 className="text-3xl font-bold mb-6">Tertarik Bekerja Sama?</h2>
          <p className="mb-10 text-emerald-50 opacity-90">
            Saya selalu terbuka untuk diskusi mengenai teknologi, peluang kerja,
            atau sekadar bertukar ide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:youssibarani17@gmail.com"
              className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-lg"
            >
              Hubungi Saya
            </a>
            <a
              href="https://www.linkedin.com/in/yous-sibarani-5a4748328/"
              className="bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all border border-emerald-500"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/yous1705"
              className="bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all border border-emerald-500"
            >
              Lihat GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default aboutMePage;
