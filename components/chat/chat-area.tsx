"use client"

import { useChat } from "@ai-sdk/react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Lock, Shield } from "lucide-react"

interface ChatAreaProps {
  selectedChat: string
  onToggleContactPanel: () => void
}

export function ChatArea({ selectedChat, onToggleContactPanel }: ChatAreaProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (input.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [input])

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="h-20 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-600 text-white">AJ</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-800" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Alice Johnson</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-400">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Lock className="h-3 w-3 mr-1" />
            End-to-End Encrypted
          </Badge>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white">
              <Video className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:text-white"
              onClick={onToggleContactPanel}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
        <div className="py-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-full p-6 mb-6">
                <Shield className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Secure Conversation</h3>
              <p className="text-slate-400 max-w-md">
                Messages are end-to-end encrypted. Only you and Alice can read them.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-end space-x-3 group ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 mb-1">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">AJ</AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-[70%] ${message.role === "user" ? "order-first" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-3 relative ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-slate-700 text-slate-100 border border-slate-600"
                  }`}
                >
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <p key={`${message.id}-${i}`} className="whitespace-pre-wrap leading-relaxed">
                            {part.text}
                          </p>
                        )
                      default:
                        return null
                    }
                  })}

                  {/* Security indicator */}
                  <div className="absolute -bottom-1 -right-1">
                    <div className="bg-emerald-500 rounded-full p-1">
                      <Lock className="h-2 w-2 text-white" />
                    </div>
                  </div>
                </div>

                {/* Timestamp */}
                <p
                  className={`text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 mb-1">
                  <AvatarFallback className="bg-emerald-600 text-white text-sm">JD</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-end space-x-3">
              <Avatar className="h-8 w-8 mb-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-600 text-white text-sm">AJ</AvatarFallback>
              </Avatar>
              <div className="bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700">
        {isTyping && (
          <div className="mb-2 text-sm text-slate-400 flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
              <div
                className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span>Alice is typing...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-white">
            <Paperclip className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a secure message..."
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 pr-12"
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-white"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200 hover:scale-105"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
