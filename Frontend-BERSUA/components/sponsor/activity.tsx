"use client"

import { MessageSquare, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export default function RecentActivity() {
  const activities = [
    {
      type: "message",
      title: "Message from @animator_jogja",
      description: "Regarding Malin Kundang Season 2",
      time: "2 hours ago",
      icon: MessageSquare,
    },
    {
      type: "trending",
      title: "Borobudur Project Hit 70% Funded",
      description: "Great momentum, nearly fully funded",
      time: "5 hours ago",
      icon: TrendingUp,
    },
    {
      type: "alert",
      title: "New Project Available",
      description: "Timun Mas reboot matching your interests",
      time: "1 day ago",
      icon: AlertCircle,
    },
    {
      type: "success",
      title: "Funding Goal Reached",
      description: "Ramayana Digital fully funded!",
      time: "2 days ago",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-fit">
      <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          const colors = {
            message: "text-blue-500 bg-blue-50",
            trending: "text-green-500 bg-green-50",
            alert: "text-amber-500 bg-amber-50",
            success: "text-emerald-500 bg-emerald-50",
          }
          return (
            <div
              key={index}
              className="flex gap-3 pb-3 border-b border-border last:border-0 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[activity.type as keyof typeof colors]}`}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
