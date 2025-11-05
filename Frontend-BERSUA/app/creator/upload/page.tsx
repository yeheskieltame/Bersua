"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, Cable as Cube, Music, Image, AlertCircle, CheckCircle, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type AssetType = "cerita" | "model3d" | "musik" | "visual" | null

interface AICheckStep {
  name: string
  status: "pending" | "checking" | "passed" | "failed"
  message: string
}

export default function UploadAsset() {
  const router = useRouter()
  const [assetType, setAssetType] = useState<AssetType>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [aiChecks, setAiChecks] = useState<AICheckStep[]>([
    { name: "Cek Plagiarisme", status: "pending", message: "Memastikan karya orisinal" },
    { name: "Cek Autentisitas", status: "pending", message: "Memverifikasi keaslian budaya" },
    { name: "Cek Kualitas Teknis", status: "pending", message: "Memeriksa standar teknis" },
  ])
  const [allChecksPassed, setAllChecksPassed] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintingProgress, setMintingProgress] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    culture: "",
    price: "",
    royalty: 20,
  })

  const assetTypes = [
    { id: "cerita", label: "Cerita", icon: FileText, description: "PDF, DOCX (max 50MB)" },
    { id: "model3d", label: "3D Model", icon: Cube, description: "FBX, OBJ, GLB (max 100MB)" },
    { id: "musik", label: "Musik", icon: Music, description: "MP3, WAV (max 50MB)" },
    { id: "visual", label: "Visual 2D", icon: Image, description: "PNG, SVG (max 25MB)" },
  ]

  const cultures = ["Jawa", "Sunda", "Bali", "Sumatera", "Kalimantan", "Sulawesi", "Papua", "NTT", "NTB"]

  const runAIChecks = async () => {
    // Reset checks
    setAiChecks([
      { name: "Cek Plagiarisme", status: "checking", message: "Menganalisis kemiripan dengan database..." },
      { name: "Cek Autentisitas", status: "pending", message: "Memverifikasi keaslian budaya" },
      { name: "Cek Kualitas Teknis", status: "pending", message: "Memeriksa standar teknis" },
    ])

    // Check 1: Plagiarism
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const plagiarismPassed = Math.random() > 0.1
    setAiChecks((prev) => [
      {
        ...prev[0],
        status: plagiarismPassed ? "passed" : "failed",
        message: plagiarismPassed
          ? "✓ Karya 100% orisinal"
          : "✗ Ditemukan 15% kemiripan dengan aset lain",
      },
      { ...prev[1], status: "checking", message: "Memverifikasi motif dan elemen budaya..." },
      prev[2],
    ])

    if (!plagiarismPassed) {
      setAiChecks((prev) => [
        prev[0],
        { ...prev[1], status: "pending", message: "Memverifikasi keaslian budaya" },
        { ...prev[2], status: "pending", message: "Memeriksa standar teknis" },
      ])
      return
    }

    // Check 2: Authenticity
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const authenticityPassed = Math.random() > 0.1
    setAiChecks((prev) => [
      prev[0],
      {
        ...prev[1],
        status: authenticityPassed ? "passed" : "failed",
        message: authenticityPassed
          ? "✓ Motif budaya terverifikasi asli"
          : "✗ Motif tidak sesuai dengan asal budaya yang dipilih",
      },
      { ...prev[2], status: "checking", message: "Menganalisis kualitas teknis..." },
    ])

    if (!authenticityPassed) {
      setAiChecks((prev) => [prev[0], prev[1], { ...prev[2], status: "pending", message: "Memeriksa standar teknis" }])
      return
    }

    // Check 3: Technical Quality
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const qualityPassed = Math.random() > 0.1
    setAiChecks((prev) => [
      prev[0],
      prev[1],
      {
        ...prev[2],
        status: qualityPassed ? "passed" : "failed",
        message: qualityPassed
          ? assetType === "model3d"
            ? "✓ Poly count optimal, tekstur 4K"
            : assetType === "musik"
              ? "✓ Bitrate 320kbps, format valid"
              : "✓ Resolusi dan format sesuai standar"
          : "✗ Kualitas tidak memenuhi standar minimum",
      },
    ])

    if (qualityPassed) {
      setAllChecksPassed(true)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!assetType) return

    setIsUploading(true)
    setUploadProgress(0)
    setAllChecksPassed(false)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 30
      })
    }, 200)

    // Wait for upload to complete
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)

      // Start AI checks
      runAIChecks()
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMintNFT = async () => {
    setIsMinting(true)
    setMintingProgress(0)

    // Simulate minting process
    const steps = [
      { progress: 25, delay: 800 },
      { progress: 50, delay: 1000 },
      { progress: 75, delay: 1200 },
      { progress: 100, delay: 800 },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay))
      setMintingProgress(step.progress)
    }

    setIsMinting(false)
    setShowSuccessModal(true)
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    router.push("/creator")
  }

  const getStatusIcon = (status: AICheckStep["status"]) => {
    switch (status) {
      case "checking":
        return <Loader2 size={20} className="animate-spin text-primary" />
      case "passed":
        return <CheckCircle size={20} className="text-green-600" />
      case "failed":
        return <AlertCircle size={20} className="text-red-600" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted" />
    }
  }

  const allChecksFinished = aiChecks.every((check) => check.status === "passed" || check.status === "failed")

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">Upload Aset Baru</h1>
        <p className="text-lg text-muted-foreground">Bagikan karya budaya Anda dan dapatkan royalti selamanya</p>
      </div>

      {/* Step 1: Choose Asset Type */}
      {!assetType && (
        <div className="bg-card rounded-xl p-8 shadow-sm border border-border mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6">Pilih Jenis Aset</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {assetTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setAssetType(type.id as AssetType)}
                  className="p-6 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                >
                  <Icon size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform mx-auto" />
                  <h3 className="font-bold text-base text-foreground mb-1">{type.label}</h3>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 2: Upload & Form */}
      {assetType && (
        <div className="space-y-6 animate-slide-up">
          {/* File Upload */}
          <div className="bg-card rounded-xl p-8 shadow-sm border-2 border-dashed border-border hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center justify-center py-12">
              {!isUploading && uploadProgress === 0 && (
                <>
                  <Upload size={48} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Drag & drop file Anda di sini</h3>
                  <p className="text-muted-foreground mb-6">atau klik untuk memilih</p>
                  <input type="file" onChange={handleFileUpload} className="hidden" id="file-input" />
                  <Button asChild variant="outline">
                    <label htmlFor="file-input" className="cursor-pointer">
                      Pilih File
                    </label>
                  </Button>
                </>
              )}

              {isUploading && (
                <div className="w-full max-w-xs">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm font-medium">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground">Mengunggah file...</p>
                </div>
              )}

              {uploadProgress === 100 && !isUploading && (
                <div className="w-full max-w-md">
                  <CheckCircle size={48} className="text-green-600 mb-4 mx-auto" />
                  <p className="text-center font-semibold text-lg mb-2">File Berhasil Diunggah!</p>
                  <p className="text-center text-muted-foreground text-sm">Memulai AI Quality Gate...</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Quality Gate Steps */}
          {uploadProgress === 100 && (
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border animate-slide-up">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={24} className="text-primary" />
                <h2 className="text-2xl font-bold">AI Quality Gate</h2>
              </div>

              <div className="space-y-4">
                {aiChecks.map((check, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      check.status === "passed"
                        ? "border-green-200 bg-green-50/50"
                        : check.status === "failed"
                          ? "border-red-200 bg-red-50/50"
                          : check.status === "checking"
                            ? "border-primary/20 bg-primary/5"
                            : "border-border bg-muted/30"
                    }`}
                  >
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{check.name}</h3>
                      <p className="text-sm text-muted-foreground">{check.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {allChecksFinished && !allChecksPassed && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-900 font-semibold mb-2">Aset Anda perlu direvisi</p>
                  <p className="text-sm text-amber-800 mb-4">
                    Silakan perbaiki masalah yang terdeteksi dan upload ulang.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAssetType(null)
                      setUploadProgress(0)
                      setAiChecks([
                        { name: "Cek Plagiarisme", status: "pending", message: "Memastikan karya orisinal" },
                        { name: "Cek Autentisitas", status: "pending", message: "Memverifikasi keaslian budaya" },
                        { name: "Cek Kualitas Teknis", status: "pending", message: "Memeriksa standar teknis" },
                      ])
                      setAllChecksPassed(false)
                    }}
                  >
                    Upload Ulang
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Form Fields - Only show after successful AI checks */}
          {allChecksPassed && !isMinting && (
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border space-y-6 animate-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={24} className="text-green-600" />
                <h2 className="text-2xl font-bold">Detail Aset & Minting</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Judul Aset *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Legenda Malin Kundang Modern"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Deskripsi *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Jelaskan aset Anda dan nilai budaya yang terkandung..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Asal Budaya *</label>
                  <select
                    name="culture"
                    value={formData.culture}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="">Pilih asal budaya...</option>
                    {cultures.map((culture) => (
                      <option key={culture} value={culture}>
                        {culture}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Harga Lisensi (Rp) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="100000"
                    min="1000"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Royalti Perpetual: {formData.royalty}%</label>
                <input
                  type="range"
                  name="royalty"
                  min="5"
                  max="50"
                  value={formData.royalty}
                  onChange={handleInputChange}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>5%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Dapatkan {formData.royalty}% setiap kali aset Anda digunakan dalam proyek baru
                </p>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  Gasless Minting
                </h3>
                <p className="text-xs text-muted-foreground">
                  Biaya gas fee akan ditanggung platform. Anda tidak perlu membayar apapun untuk minting NFT!
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  onClick={handleMintNFT}
                  disabled={!formData.title || !formData.description || !formData.culture || !formData.price}
                >
                  Mint NFT Sekarang (Gratis!)
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setAssetType(null)
                    setUploadProgress(0)
                    setAiChecks([
                      { name: "Cek Plagiarisme", status: "pending", message: "Memastikan karya orisinal" },
                      { name: "Cek Autentisitas", status: "pending", message: "Memverifikasi keaslian budaya" },
                      { name: "Cek Kualitas Teknis", status: "pending", message: "Memeriksa standar teknis" },
                    ])
                    setAllChecksPassed(false)
                  }}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}

          {/* Minting Progress */}
          {isMinting && (
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border animate-slide-up">
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 size={48} className="animate-spin text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Minting NFT...</h3>
                <p className="text-muted-foreground mb-6">Mohon tunggu, proses ini memakan waktu beberapa detik</p>
                <div className="w-full max-w-xs">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{mintingProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
                      style={{ width: `${mintingProgress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-6 text-sm text-muted-foreground space-y-1">
                  <p>• Membuat metadata NFT...</p>
                  <p>• Mengunggah ke IPFS...</p>
                  <p>• Minting di blockchain Base...</p>
                  <p>• Mengatur smart contract royalti...</p>
                </div>
              </div>
            </div>
          )}

          {uploadProgress === 0 && (
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setAssetType(null)}>
              Kembali
            </Button>
          )}
        </div>
      )}

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">NFT Berhasil Di-mint!</DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <p>Selamat! Aset budaya Anda sekarang telah menjadi NFT di blockchain Base.</p>
              <div className="bg-muted rounded-lg p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token ID:</span>
                  <span className="font-mono font-semibold">#{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-semibold">Base Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Royalty:</span>
                  <span className="font-semibold">{formData.royalty}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas Fee:</span>
                  <span className="font-semibold text-green-600">Rp 0 (Gratis!)</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Aset Anda sekarang dapat ditemukan di marketplace dan siap untuk dibeli oleh animator!
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={handleSuccessClose} className="w-full">
              Lihat Dashboard
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setAssetType(null)}>
              Upload Aset Lain
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
