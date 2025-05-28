"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Lock, Shield, Copy, ImageIcon, Trash2, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

export function ContactPanel() {
  const [isMuted, setIsMuted] = useState(false)

  const keyFingerprint = "A1B2 C3D4 E5F6 G7H8 I9J0 K1L2 M3N4 O5P6"

  return (
    <div className="flex flex-col h-full bg-[var(--sidebar)]/95 backdrop-blur-md rounded-l-2xl shadow-xl p-0 md:p-0">
      {/* Contact Header */}
      <div className="p-6 text-center border-b border-[var(--sidebar-border)] bg-[var(--sidebar)]/80 rounded-t-2xl">
        <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-[var(--primary)]/30 shadow-lg">
          <AvatarImage src="/placeholder.svg?height=80&width=80" />
          <AvatarFallback className="bg-[var(--primary)] text-[var(--foreground)] text-2xl">AJ</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 tracking-wide">Alice Johnson</h2>
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse border-2 border-[var(--sidebar)]"></div>
          <span className="text-emerald-400 text-sm">Online</span>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 rounded-full px-3 py-1 font-medium shadow-sm">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified Contact
        </Badge>
      </div>

      {/* Security Section */}
      <div className="p-6 border-b border-[var(--sidebar-border)] bg-[var(--sidebar)]/80">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-[var(--primary)]" />
          <h3 className="font-semibold text-[var(--foreground)]">Security</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-[var(--card)]/80 rounded-xl p-4 shadow-md">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">End-to-End Encryption</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Messages are secured with encryption. Only you and Alice can read them.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--muted-foreground)]">Key Fingerprint</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--border)] shadow-sm">
              <code className="text-xs text-[var(--muted-foreground)] font-mono leading-relaxed">{keyFingerprint}</code>
            </div>
          </div>

          <Button variant="outline" className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary-foreground)] rounded-full font-semibold transition-all">
            Verify Identity
          </Button>
        </div>
      </div>

      {/* Shared Media */}
      <div className="p-6 border-b border-[var(--sidebar-border)] bg-[var(--sidebar)]/80">
        <h3 className="font-semibold text-[var(--foreground)] mb-4">Shared Media</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-[var(--card)]/80 rounded-lg flex items-center justify-center group hover:bg-[var(--primary)]/10 transition-colors cursor-pointer shadow-sm"
            >
              <ImageIcon className="h-6 w-6 text-[var(--muted-foreground)] group-hover:text-[var(--primary)]" />
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full text-[var(--primary)] hover:text-[var(--primary-foreground)] font-semibold">
          View All Media
        </Button>
      </div>

      {/* Settings */}
      <div className="p-6 flex-1 bg-[var(--sidebar)]/80 rounded-b-2xl">
        <h3 className="font-semibold text-[var(--foreground)] mb-4">Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-[var(--muted-foreground)]" />
              ) : (
                <Volume2 className="h-4 w-4 text-[var(--muted-foreground)]" />
              )}
              <span className="text-sm text-[var(--muted-foreground)]">Mute Notifications</span>
            </div>
            <Switch checked={isMuted} onCheckedChange={setIsMuted} className="data-[state=checked]:bg-[var(--primary)]" />
          </div>

          <Separator className="bg-[var(--border)]" />

          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full font-semibold">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Conversation
          </Button>
        </div>
      </div>
    </div>
  )
}
