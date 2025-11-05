"use client"

import { useState } from "react"
import { X, Share2, Heart, Eye, TrendingUp, Zap, Check, Sparkles, Play, MessageCircle, DollarSign, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ShowcaseDetailProps {
  showcase: any
  onClose: () => void
}

export default function ShowcaseDetail({ showcase, onClose }: ShowcaseDetailProps) {
  const [showFundingModal, setShowFundingModal] = useState(false)
  const [fundingAmount, setFundingAmount] = useState("")
  const [isFunding, setIsFunding] = useState(false)
  const [fundingSuccess, setFundingSuccess] = useState(false)

  // Calculate overall AI score from components
  const technicalQuality = 87
  const storytellingScore = 82
  const viralPrediction = 85 // percentage
  const overallScore = Math.round((technicalQuality + storytellingScore + viralPrediction) / 3)

  const handleFund = async () => {
    setIsFunding(true)

    // Simulate funding transaction
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setIsFunding(false)
    setFundingSuccess(true)

    // Close after showing success
    setTimeout(() => {
      setShowFundingModal(false)
      setFundingSuccess(false)
    }, 3000)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between items-center z-10">
            <h2 className="text-xl font-bold">Karya Showcase</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Video Player */}
            <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎬</div>
                  <Button size="lg" className="rounded-full">
                    <Play size={20} className="mr-2" />
                    Play Animation
                  </Button>
                </div>
              </div>
            </div>

            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{showcase.title}</h1>
                  <p className="text-lg text-muted-foreground">by {showcase.animator}</p>
                </div>
                {showcase.ipVerified && (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-1">✅</span>
                    <span className="text-xs text-green-600 font-semibold">IP Verified</span>
                  </div>
                )}
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">{showcase.description}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Eye size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Views</span>
                </div>
                <p className="font-bold text-2xl text-foreground">{showcase.views.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-accent" />
                  <span className="text-xs text-muted-foreground">Retention</span>
                </div>
                <p className="font-bold text-2xl text-accent">{showcase.retention}%</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={16} className="text-secondary-foreground" />
                  <span className="text-xs text-muted-foreground">AI Score</span>
                </div>
                <p className="font-bold text-2xl text-foreground">{showcase.aiScore}/100</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <span className="text-xs text-muted-foreground">Budaya</span>
                <p className="font-bold text-lg text-foreground">{showcase.culture}</p>
              </div>
            </div>

            {/* AI Quality Analyzer - Detailed */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={24} className="text-primary" />
                <h2 className="text-2xl font-bold">AI Quality Analyzer</h2>
              </div>

              {/* Technical Quality Breakdown */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Technical Quality: {technicalQuality}/100
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Frame Rate Consistency</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }} />
                      </div>
                      <span className="text-sm font-bold">92%</span>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Motion Fluidity</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "88%" }} />
                      </div>
                      <span className="text-sm font-bold">88%</span>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Color Grading</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }} />
                      </div>
                      <span className="text-sm font-bold">85%</span>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Audio Sync</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "94%" }} />
                      </div>
                      <span className="text-sm font-bold">94%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Storytelling Score Breakdown */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  Storytelling Score: {storytellingScore}/100
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Pacing</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: "80%" }} />
                      </div>
                      <span className="text-sm font-bold">80%</span>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Character Development</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: "78%" }} />
                      </div>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Cultural Authenticity</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: "89%" }} />
                      </div>
                      <span className="text-sm font-bold">89%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viral Prediction */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Viral Prediction
                </h3>
                <div className="bg-background/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-green-600">{viralPrediction}%</span>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-lg">HIGH</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on analysis of 10,000+ viral Indonesian videos
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      <span>Thumbnail appeal: Excellent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      <span>First 3-second hook: Engaging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      <span>Punchline timing: Optimal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Target Audience
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Age Group</p>
                    <p className="font-bold text-lg">18-25 Years</p>
                    <p className="text-xs text-muted-foreground mt-1">Primary: 62%</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Gender Split</p>
                    <p className="font-bold text-lg">Male 65% | Female 35%</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Interest</p>
                    <p className="font-bold text-lg">Action + Heritage</p>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  AI Improvement Suggestions
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Add more dynamic camera movement in scene 2 (00:45-01:20)</li>
                  <li>• Color grading could be enhanced for better contrast in outdoor scenes</li>
                  <li>• Audio sync is excellent, maintain this quality in future projects</li>
                  <li>• Consider adding subtitles for broader audience reach</li>
                  <li>• Pacing is optimal for streaming platforms (5-12 min duration)</li>
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-3">Tags & Categories</h3>
              <div className="flex flex-wrap gap-2">
                {showcase.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-secondary/20 text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* IP Verification - Enhanced */}
            {showcase.ipVerified && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2 text-xl">
                  <Check size={24} />
                  IP Verification Badge - Zero Copyright Risk ✅
                </h3>
                <p className="text-sm text-green-800 mb-4">
                  All assets used in this animation have been verified on blockchain with valid licenses:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {showcase.usedAssets.map((asset: string) => (
                    <div key={asset} className="bg-green-100 rounded-lg p-3 flex items-center gap-3">
                      <Check size={20} className="text-green-600 shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-green-900">Aset {asset}</p>
                        <p className="text-xs text-green-700">Licensed • Verified on Base</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-sm font-semibold text-green-900">
                    🛡️ This project is safe to fund - all IP rights are legally cleared
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="sticky bottom-0 bg-card pt-4 border-t border-border -mx-6 px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => setShowFundingModal(true)} className="h-12 text-base col-span-1 md:col-span-2">
                  <DollarSign size={20} className="mr-2" />
                  Fund This Project
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  <MessageCircle size={20} className="mr-2" />
                  Contact
                </Button>
              </div>
              <div className="flex gap-4 mt-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Heart size={20} className="mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 size={20} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Funding Modal */}
      <Dialog open={showFundingModal} onOpenChange={setShowFundingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fund This Project</DialogTitle>
            <DialogDescription>
              Support {showcase.animator} dalam memproduksi "{showcase.title}"
            </DialogDescription>
          </DialogHeader>

          {!fundingSuccess ? (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project:</span>
                  <span className="font-semibold">{showcase.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Creator:</span>
                  <span className="font-semibold">{showcase.animator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Score:</span>
                  <span className="font-semibold text-green-600">{overallScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Status:</span>
                  <span className="font-semibold text-green-600">✅ Verified</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Jumlah Funding (Rp)</label>
                <input
                  type="number"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                  placeholder="5000000"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary outline-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Minimum: Rp 1,000,000 • Suggested: Rp 5,000,000
                </p>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm">
                <h4 className="font-semibold mb-2">Funding Terms:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Milestone-based escrow via smart contract</li>
                  <li>• ROI projection based on AI analytics</li>
                  <li>• Direct communication with creator</li>
                  <li>• Monthly progress reports</li>
                </ul>
              </div>

              {!isFunding ? (
                <Button onClick={handleFund} className="w-full" disabled={!fundingAmount || Number(fundingAmount) < 1000000}>
                  Confirm Funding
                </Button>
              ) : (
                <div className="py-6 text-center">
                  <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
                  <p className="font-semibold">Processing Transaction...</p>
                  <p className="text-sm text-muted-foreground mt-2">Mohon konfirmasi di wallet Anda</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Funding Successful!</h3>
              <p className="text-muted-foreground">
                Anda telah berhasil mendanai proyek ini sebesar Rp{Number(fundingAmount).toLocaleString()}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
