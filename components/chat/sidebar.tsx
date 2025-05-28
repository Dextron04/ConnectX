"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Settings, Shield, Lock } from "lucide-react"

interface SidebarProps {
  selectedChat: string
  onSelectChat: (chatId: string) => void
}

const conversations = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "The documents are ready for review",
    timestamp: "2:34 PM",
    avatar: "/placeholder.svg?height=48&width=48",
    online: true,
    unread: 2,
    verified: true,
  },
  {
    id: "2",
    name: "Security Team",
    lastMessage: "System update completed successfully",
    timestamp: "1:15 PM",
    avatar: "/placeholder.svg?height=48&width=48",
    online: true,
    unread: 0,
    verified: true,
  },
  {
    id: "3",
    name: "Project Alpha",
    lastMessage: "Meeting scheduled for tomorrow",
    timestamp: "11:30 AM",
    avatar: "/placeholder.svg?height=48&width=48",
    online: false,
    unread: 1,
    verified: true,
  },
]

export function Sidebar({ selectedChat, onSelectChat }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col h-full w-full md:w-64 bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] shadow-lg z-10">
      {/* Header */}
      <div className="p-4 border-b border-[var(--sidebar-border)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-[var(--primary)]" />
            <h1 className="text-lg font-bold text-[var(--sidebar-foreground)] tracking-wide">ConnectX</h1>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--muted-foreground)] hover:text-[var(--primary)]">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-[var(--primary)]">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-[var(--primary)] text-[var(--sidebar-foreground)]">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-[var(--sidebar-foreground)] text-base">John Doe</p>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse border-2 border-[var(--sidebar)]"></div>
              <span className="text-xs text-emerald-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-[var(--primary)] text-base rounded-lg"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectChat(conversation.id)}
            className={`p-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 mb-1 flex items-center space-x-3 group ${selectedChat === conversation.id ? "bg-[var(--card)] border-l-4 border-[var(--primary)]" : "hover:bg-[var(--card)]"}`}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-[var(--muted)] text-[var(--sidebar-foreground)]">
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--sidebar)] ${conversation.online ? "bg-emerald-400" : "bg-[var(--muted)]"}`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-[var(--sidebar-foreground)] truncate text-base">{conversation.name}</h3>
                  {conversation.verified && <Lock className="h-3 w-3 text-emerald-400" />}
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">{conversation.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--muted-foreground)] truncate">{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                  <Badge className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full ml-2">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
