export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Bersua</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Marketplace NFT untuk pelestarian dan monetisasi aset budaya Indonesia.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produk</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Showcase
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Creator Dashboard
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-background/60 text-center md:text-left mb-4 md:mb-0">
              © 2025 Bersua. Semua hak dilindungi.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                Twitter
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                Discord
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
