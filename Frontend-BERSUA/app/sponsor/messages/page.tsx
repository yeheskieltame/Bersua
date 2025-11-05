"use client"

import { useState } from "react"
import { Send, Paperclip, Search, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SponsorMessages() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [message, setMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Studio Wayang Digital",
      project: "Ramayana: The Modern Saga",
      avatar: "🎭",
      lastMessage: "Terima kasih atas dukungannya! Kami baru saja menyelesaikan milestone...",
      timestamp: "2 jam lalu",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Nusantara Animation",
      project: "Kerajaan Nusantara",
      avatar: "👑",
      lastMessage: "Update terbaru: Scene 5-8 sudah masuk tahap rendering",
      timestamp: "5 jam lalu",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "Papua Creative Studio",
      project: "Legenda Cendrawasih",
      avatar: "🦜",
      lastMessage: "Proyek telah selesai! Silakan cek hasilnya di dashboard",
      timestamp: "1 hari lalu",
      unread: 1,
      online: false,
    },
    {
      id: 4,
      name: "Aceh Animation Collective",
      project: "Tari Saman Chronicles",
      avatar: "💃",
      lastMessage: "Kami membutuhkan feedback untuk concept art yang baru",
      timestamp: "2 hari lalu",
      unread: 0,
      online: false,
    },
  ]

  const messages = {
    1: [
      {
        id: 1,
        sender: "them",
        text: "Selamat siang! Terima kasih sudah mendanai proyek Ramayana kami 🙏",
        timestamp: "10:30",
      },
      {
        id: 2,
        sender: "me",
        text: "Sama-sama! Saya sangat excited melihat progress proyek ini.",
        timestamp: "10:32",
      },
      {
        id: 3,
        sender: "them",
        text: "Kami baru saja menyelesaikan milestone pertama yaitu character design dan storyboard. Silakan cek di dashboard 😊",
        timestamp: "10:35",
      },
      {
        id: 4,
        sender: "them",
        text: "Berikut preview salah satu character: [File: rama_concept.jpg]",
        timestamp: "10:35",
      },
      {
        id: 5,
        sender: "me",
        text: "Wah designnya keren! Saya suka pendekatan modern yang tetap menghormati nilai budaya aslinya.",
        timestamp: "11:20",
      },
      {
        id: 6,
        sender: "them",
        text: "Terima kasih! Kami akan mulai animasi scene 1-3 minggu depan. Estimasi selesai 2 minggu.",
        timestamp: "14:15",
      },
    ],
  }

  const currentMessages = messages[selectedChat as keyof typeof messages] || []
  const currentConversation = conversations.find((c) => c.id === selectedChat)

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      setMessage("")
    }
  }

  return (
    <div className="p-0 h-[calc(100vh-80px)] max-w-7xl mx-auto">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Cari percakapan..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 border-b border-border hover:bg-muted/50 transition-colors text-left ${
                  selectedChat === conv.id ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">{conv.name}</h3>
                      {conv.unread > 0 && (
                        <span className="ml-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 truncate">{conv.project}</p>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-background">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                      {currentConversation.avatar}
                    </div>
                    {currentConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">{currentConversation.name}</h2>
                    <p className="text-xs text-muted-foreground">{currentConversation.project}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <MoreVertical size={18} />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-md ${msg.sender === "me" ? "order-2" : "order-1"}`}>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${msg.sender === "me" ? "text-right" : ""}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-end gap-3">
                  <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                    <Paperclip size={18} />
                  </Button>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Ketik pesan..."
                    rows={1}
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  />
                  <Button onClick={handleSendMessage} className="shrink-0">
                    <Send size={18} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-lg text-muted-foreground">Pilih percakapan untuk mulai chat</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Show message on small screens */}
        <div className="md:hidden flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="text-6xl mb-4">💬</div>
            <p className="text-muted-foreground">Pilih percakapan dari daftar di sebelah kiri</p>
          </div>
        </div>
      </div>
    </div>
  )
}
