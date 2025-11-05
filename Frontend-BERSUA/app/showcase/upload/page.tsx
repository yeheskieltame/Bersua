"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Video, Tag, CheckCircle, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NFTAsset {
  id: string
  title: string
  type: string
  selected: boolean
}

export default function UploadShowcase() {
  const router = useRouter()
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    culture: "",
    tags: [] as string[],
  })

  const [aiAnalysis, setAiAnalysis] = useState({
    technicalScore: 0,
    storytellingScore: 0,
    viralPrediction: "",
    targetAudience: "",
    suggestions: [] as string[],
  })

  // Mock NFT assets from marketplace
  const [availableAssets] = useState<NFTAsset[]>([
    { id: "#1234", title: "Wayang Gatot Kaca 3D", type: "3D Model", selected: false },
    { id: "#5678", title: "Gamelan Jawa Ensemble", type: "Musik", selected: false },
    { id: "#9101", title: "Legenda Sangkuriang", type: "Cerita", selected: false },
    { id: "#1121", title: "Motif Batik Mega Mendung", type: "Visual 2D", selected: false },
  ])

  const [selectedAssets, setSelectedAssets] = useState<string[]>([])

  const cultures = ["Jawa", "Sunda", "Bali", "Sumatera", "Kalimantan", "Sulawesi", "Papua", "NTT", "NTB"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleAssetToggle = (assetId: string) => {
    setSelectedAssets((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    )
  }

  const handleUpload = async () => {
    if (!videoFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 20
      })
    }, 300)

    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)

      // Start AI analysis
      runAIAnalysis()
    }, 3000)
  }

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis steps
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate scores
    const techScore = Math.floor(Math.random() * 20) + 75 // 75-95
    const storyScore = Math.floor(Math.random() * 20) + 70 // 70-90
    const viralChance = techScore > 85 && storyScore > 80 ? "HIGH" : techScore > 75 ? "MEDIUM" : "LOW"

    setAiAnalysis({
      technicalScore: techScore,
      storytellingScore: storyScore,
      viralPrediction: viralChance,
      targetAudience: "Male 18-25, Interest: Action + Heritage",
      suggestions: [
        "Add more dynamic camera movement in scene 2 (00:45-01:20)",
        "Color grading could be enhanced for better contrast",
        "Audio sync is excellent, maintain this quality",
        "Cultural authenticity score: 92% - Very good!",
      ],
    })

    setIsAnalyzing(false)
    setAnalysisComplete(true)
  }

  const handlePublish = () => {
    setShowSuccessModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Button variant="outline" onClick={() => router.push("/showcase")}>
              ← Kembali ke Showcase
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">Upload Animasi ke Showcase</h1>
          <p className="text-lg text-muted-foreground">
            Tampilkan karya animasi budaya Anda dan dapatkan AI analysis untuk attract sponsors
          </p>
        </div>

        {/* Video Upload Section */}
        {!videoFile && (
          <div className="bg-card rounded-xl p-8 shadow-sm border-2 border-dashed border-border hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center justify-center py-12">
              <Video size={48} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Upload Video Animasi</h3>
              <p className="text-muted-foreground mb-6">MP4, MOV, max 500MB</p>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-input"
              />
              <Button asChild>
                <label htmlFor="video-input" className="cursor-pointer">
                  Pilih Video
                </label>
              </Button>
            </div>
          </div>
        )}

        {/* Video Preview & Upload */}
        {videoFile && !isUploading && uploadProgress === 0 && (
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Video Selected</h3>
                <p className="text-sm text-muted-foreground">{videoFile.name}</p>
                <p className="text-xs text-muted-foreground">{(videoFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button onClick={handleUpload}>Upload & Analyze</Button>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <div className="text-center">
              <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Uploading Video...</h3>
              <div className="w-full max-w-xs mx-auto mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Mohon tunggu...</p>
            </div>
          </div>
        )}

        {/* AI Analysis Running */}
        {isAnalyzing && (
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={24} className="text-primary" />
              <h2 className="text-2xl font-bold">AI Quality Analyzer</h2>
            </div>
            <div className="text-center py-8">
              <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
              <p className="font-semibold text-lg mb-2">Analyzing Your Animation...</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Analyzing technical quality...</p>
                <p>• Evaluating storytelling score...</p>
                <p>• Predicting viral potential...</p>
                <p>• Detecting target audience...</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields - Show after analysis */}
        {analysisComplete && (
          <>
            {/* AI Analysis Results */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 shadow-sm border border-primary/20 animate-slide-up">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle size={24} className="text-green-600" />
                <h2 className="text-2xl font-bold">AI Analysis Complete!</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Technical Quality</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${aiAnalysis.technicalScore}%` }}
                      />
                    </div>
                    <span className="text-2xl font-bold text-primary">{aiAnalysis.technicalScore}/100</span>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Storytelling Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-secondary rounded-full"
                        style={{ width: `${aiAnalysis.storytellingScore}%` }}
                      />
                    </div>
                    <span className="text-2xl font-bold text-accent">{aiAnalysis.storytellingScore}/100</span>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Viral Prediction</p>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg text-lg font-bold ${
                      aiAnalysis.viralPrediction === "HIGH"
                        ? "bg-green-100 text-green-700"
                        : aiAnalysis.viralPrediction === "MEDIUM"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {aiAnalysis.viralPrediction}
                  </span>
                </div>

                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Target Audience</p>
                  <p className="font-semibold">{aiAnalysis.targetAudience}</p>
                </div>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  AI Suggestions
                </p>
                <ul className="space-y-2">
                  {aiAnalysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <AlertCircle size={16} className="text-accent mt-0.5 shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Project Details Form */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border space-y-6">
              <h2 className="text-2xl font-bold">Detail Proyek</h2>

              <div>
                <label className="block text-sm font-semibold mb-2">Judul Animasi *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Sangkuriang: The Cyber Legend"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Deskripsi *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ceritakan tentang animasi Anda, konsep, dan nilai budaya yang diangkat..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Asal Budaya *</label>
                <select
                  value={formData.culture}
                  onChange={(e) => setFormData({ ...formData, culture: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
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

              {/* NFT Assets Used */}
              <div>
                <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                  <Tag size={18} />
                  Aset NFT Yang Digunakan *
                </label>
                <p className="text-xs text-muted-foreground mb-4">
                  Pilih aset NFT dari marketplace yang Anda gunakan dalam animasi ini (untuk IP verification)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableAssets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => handleAssetToggle(asset.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedAssets.includes(asset.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedAssets.includes(asset.id) ? "bg-primary border-primary" : "border-border"
                          }`}
                        >
                          {selectedAssets.includes(asset.id) && <CheckCircle size={16} className="text-white" />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{asset.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {asset.id} • {asset.type}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {selectedAssets.length > 0 && (
                  <p className="text-sm text-green-600 mt-3 flex items-center gap-2">
                    <CheckCircle size={16} />
                    {selectedAssets.length} aset dipilih - IP Verified ✅
                  </p>
                )}
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  Showcase Benefits
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Dapatkan exposure ke sponsor dan investor</li>
                  <li>• AI analysis gratis untuk improve kualitas</li>
                  <li>• IP Verification badge untuk kredibilitas</li>
                  <li>• Analytics real-time (views, retention, engagement)</li>
                </ul>
              </div>

              <Button
                onClick={handlePublish}
                className="w-full h-12 text-base"
                disabled={!formData.title || !formData.description || !formData.culture || selectedAssets.length === 0}
              >
                Publish ke Showcase
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Published Successfully!</DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <p>Animasi Anda sekarang live di showcase dan dapat dilihat oleh sponsor & investor!</p>
              <div className="bg-muted rounded-lg p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Score:</span>
                  <span className="font-semibold">{Math.round((aiAnalysis.technicalScore + aiAnalysis.storytellingScore) / 2)}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Viral Prediction:</span>
                  <span className="font-semibold">{aiAnalysis.viralPrediction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Status:</span>
                  <span className="font-semibold text-green-600">✅ Verified ({selectedAssets.length} assets)</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Sponsor sekarang dapat menemukan proyek Anda di discovery dashboard!
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button onClick={() => router.push("/showcase")} className="w-full">
              Lihat di Showcase
            </Button>
            <Button variant="outline" onClick={() => router.push("/showcase/upload")} className="w-full bg-transparent">
              Upload Animasi Lain
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
