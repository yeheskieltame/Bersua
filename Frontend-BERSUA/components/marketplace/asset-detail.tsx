"use client"

import { useState } from "react"
import { X, Share2, Heart, Check, Wallet, Loader2, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AssetDetailProps {
  asset: any
  onClose: () => void
}

type LicenseType = "personal" | "commercial" | "unlimited"

export default function AssetDetail({ asset, onClose }: AssetDetailProps) {
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>("commercial")
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const licenses = {
    personal: {
      name: "Personal",
      price: asset.price * 0.5,
      description: "Untuk proyek personal & portofolio",
      features: [
        "Penggunaan non-komersial",
        "1 proyek",
        "Tidak dapat digunakan untuk profit",
        "Royalti perpetual 15%",
      ],
    },
    commercial: {
      name: "Commercial",
      price: asset.price,
      description: "Untuk proyek komersial & client work",
      features: [
        "Penggunaan komersial penuh",
        "Unlimited projects",
        "Dapat menghasilkan profit",
        "Royalti perpetual 20%",
      ],
      popular: true,
    },
    unlimited: {
      name: "Unlimited",
      price: asset.price * 2.5,
      description: "Hak penuh termasuk resale rights",
      features: [
        "Semua keuntungan Commercial",
        "Hak jual ulang (resale)",
        "Modifikasi bebas",
        "Royalti perpetual 25%",
      ],
    },
  }

  const currentLicense = licenses[selectedLicense]

  const handlePurchase = () => {
    setShowWalletModal(true)
  }

  const handleConnectWallet = async () => {
    setIsProcessing(true)

    // Simulate wallet connection and transaction
    setTimeout(() => {
      setIsProcessing(false)
      setShowWalletModal(false)
      setShowSuccessModal(true)
    }, 3000)
  }

  // Generate preview based on asset type
  const renderPreview = () => {
    if (asset.type === "3D Model") {
      return (
        <div className="w-full h-80 bg-muted rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🎭</div>
            <p className="text-sm text-muted-foreground">3D Model Preview</p>
            <p className="text-xs text-muted-foreground mt-1">Interactive viewer akan tersedia</p>
          </div>
        </div>
      )
    } else if (asset.type === "Musik") {
      return (
        <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🎵</div>
            <div className="w-64 mx-auto space-y-3">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Button size="sm" variant="outline" className="rounded-full bg-primary text-white">
                    <Play size={16} />
                  </Button>
                  <div className="flex-1 h-1 bg-muted rounded-full">
                    <div className="h-full w-1/3 bg-primary rounded-full" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Preview 30 detik</p>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (asset.type === "Cerita") {
      return (
        <div className="w-full h-80 bg-amber-50 rounded-xl p-6 overflow-y-auto">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">📖</div>
            <p className="text-sm font-semibold">Preview Paragraf Pertama</p>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Pada zaman dahulu kala, di sebuah kerajaan besar yang terletak di tanah Jawa, hiduplah seorang
              kesatria pemberani bernama Gatot Kaca. Ia dikenal sebagai putra Bima yang memiliki kekuatan luar
              biasa dan kemampuan terbang melintasi langit...
            </p>
            <div className="mt-4 p-3 bg-muted/50 rounded text-center">
              <p className="text-xs text-muted-foreground italic">
                ...lanjutan cerita tersedia setelah pembelian lisensi
              </p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="w-full h-80 bg-muted rounded-xl overflow-hidden">
        <img src={asset.image || "/placeholder.svg"} alt={asset.title} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between items-center z-10">
            <h2 className="text-xl font-bold">Detail Aset</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Preview */}
            {renderPreview()}

            {/* Title & Creator */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-foreground flex-1">{asset.title}</h1>
                {asset.verified && <span className="text-3xl" title="Verified Creator">✅</span>}
              </div>
              <p className="text-lg text-muted-foreground">by {asset.creator}</p>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-muted-foreground">{asset.description}</p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Jenis</p>
                <p className="font-bold text-foreground">{asset.type}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Budaya</p>
                <p className="font-bold text-foreground">{asset.culture}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Base Price</p>
                <p className="font-bold text-primary text-lg">Rp{asset.price.toLocaleString()}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Views</p>
                <p className="font-bold text-foreground">{asset.views.toLocaleString()}</p>
              </div>
            </div>

            {/* License Tiers */}
            <div className="space-y-4">
              <h3 className="font-bold text-2xl">Pilih Paket Lisensi</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(licenses).map(([key, license]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLicense(key as LicenseType)}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                      selectedLicense === key
                        ? "border-primary bg-primary/5 shadow-lg scale-105"
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  >
                    {license.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Popular
                      </div>
                    )}
                    <h4 className="font-bold text-xl mb-2">{license.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-2">
                      Rp{Math.round(license.price).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{license.description}</p>
                    <div className="space-y-2">
                      {license.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-card pt-4 border-t border-border -mx-6 px-6 pb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handlePurchase} className="flex-1 h-12 text-base">
                  <Wallet size={20} className="mr-2" />
                  Beli {currentLicense.name} - Rp{Math.round(currentLicense.price).toLocaleString()}
                </Button>
                <Button variant="outline" className="sm:flex-none bg-transparent" onClick={() => setShowPreview(true)}>
                  <Play size={20} className="mr-2" />
                  Preview
                </Button>
                <Button variant="outline" className="sm:flex-none bg-transparent">
                  <Heart size={20} />
                </Button>
                <Button variant="outline" className="sm:flex-none bg-transparent">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-muted/30 rounded-lg p-4 text-sm">
              <p className="font-semibold mb-3 flex items-center gap-2">
                <span>📊</span> Informasi Blockchain
              </p>
              <div className="grid grid-cols-2 gap-3 text-muted-foreground">
                <div>
                  <p className="text-xs mb-1">Token ID</p>
                  <p className="font-mono font-semibold text-foreground">#{asset.id || 1234}</p>
                </div>
                <div>
                  <p className="text-xs mb-1">Network</p>
                  <p className="font-semibold text-foreground">Base Mainnet</p>
                </div>
                <div>
                  <p className="text-xs mb-1">Contract</p>
                  <p className="font-mono text-foreground">0x123...abc</p>
                </div>
                <div>
                  <p className="text-xs mb-1">Minted</p>
                  <p className="font-semibold text-foreground">2 hari lalu</p>
                </div>
              </div>
              <button className="text-primary hover:underline mt-3 font-semibold text-sm flex items-center gap-1">
                View on Basescan <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connection Modal */}
      <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Wallet & Purchase</DialogTitle>
            <DialogDescription>
              Hubungkan wallet Anda untuk membeli lisensi {currentLicense.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lisensi:</span>
                <span className="font-semibold">{currentLicense.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Harga:</span>
                <span className="font-semibold">Rp{Math.round(currentLicense.price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Gas Fee:</span>
                <span className="font-semibold text-green-600">Rp 0 (Gratis!)</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg text-primary">
                  Rp{Math.round(currentLicense.price).toLocaleString()}
                </span>
              </div>
            </div>

            {!isProcessing ? (
              <div className="space-y-3">
                <Button onClick={handleConnectWallet} className="w-full">
                  <Wallet size={18} className="mr-2" />
                  Connect MetaMask
                </Button>
                <Button variant="outline" onClick={handleConnectWallet} className="w-full bg-transparent">
                  <Wallet size={18} className="mr-2" />
                  WalletConnect
                </Button>
                <Button variant="outline" onClick={handleConnectWallet} className="w-full bg-transparent">
                  <Wallet size={18} className="mr-2" />
                  Coinbase Wallet
                </Button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
                <p className="font-semibold text-lg mb-2">Processing Transaction...</p>
                <p className="text-sm text-muted-foreground">Mohon konfirmasi di wallet Anda</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Pembelian Berhasil!</DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <p>Selamat! Anda sekarang memiliki lisensi {currentLicense.name} untuk aset ini.</p>
              <div className="bg-muted rounded-lg p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction Hash:</span>
                  <span className="font-mono font-semibold">0x{Math.random().toString(36).substring(7)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License Type:</span>
                  <span className="font-semibold">{currentLicense.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asset:</span>
                  <span className="font-semibold">{asset.title}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                File download dan NFT license certificate sudah tersedia di dashboard Anda.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button className="w-full">Download Files</Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setShowSuccessModal(false)
                onClose()
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
