import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-block bg-secondary/20 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4 md:mb-6">
              Ekosistem Budaya Digital
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground leading-tight mb-6">
              Unggah Budaya, Raih Cuan
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Marketplace NFT untuk aset animasi budaya Indonesia. Upload cerita, 3D model, atau musik tradisional Anda
              dan dapatkan royalti setiap kali terjual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-lg text-center"
              >
                Mulai Sekarang
              </Link>
              <Link
                href="/#about"
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold text-lg hover:bg-primary/5 transition-colors text-center"
              >
                Pelajari Lebih
              </Link>
            </div>
          </div>

          <div className="relative h-96 md:h-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <img
              src="/indonesian-cultural-animation-artwork-with-wayang-.jpg"
              alt="Bersua Hero Illustration"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
