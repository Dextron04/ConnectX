"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/chat/sidebar"
import { ContactPanel } from "@/components/chat/contact-panel"

export default function ConnectXApp() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [selectedChat, setSelectedChat] = useState("1")
  const [isContactPanelOpen] = useState(true)
  const [showSidebarMobile, setShowSidebarMobile] = useState(true)
  const [isMobile, setIsMobile] = useState<null | boolean>(null)

  // Set isMobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Show sidebar on mobile if no chat is selected
  useEffect(() => {
    if (isMobile === null) return
    if (isMobile) {
      setShowSidebarMobile(!selectedChat)
    }
  }, [selectedChat, isMobile])

  // Listen for window resize to reset mobile/desktop view
  useEffect(() => {
    if (isMobile === null) return
    if (!isMobile) {
      setShowSidebarMobile(false)
    } else {
      setShowSidebarMobile(!selectedChat)
    }
  }, [selectedChat, isMobile])

  // Avoid hydration mismatch: render nothing until isMobile is determined
  if (isMobile === null) return null

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Sidebar: show on desktop or if showSidebarMobile is true */}
      {(!selectedChat || !isMobile || showSidebarMobile) && (
        <div className="w-full md:w-64 bg-[var(--sidebar)] border-b md:border-b-0 md:border-r border-[var(--sidebar-border)] flex-shrink-0">
          <Sidebar
            selectedChat={selectedChat}
            onSelectChat={(id) => {
              setSelectedChat(id)
              if (isMobile) setShowSidebarMobile(false)
            }}
          />
        </div>
      )}

      {/* Main Chat Area: show on desktop or if a chat is selected on mobile */}
      {(selectedChat && (!isMobile || !showSidebarMobile)) && (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              {/* Back button for mobile */}
              {isMobile && (
                <button
                  className="mr-2 flex items-center justify-center rounded-full bg-[var(--sidebar)] text-[var(--primary)] w-8 h-8"
                  onClick={() => setShowSidebarMobile(true)}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                </button>
              )}
              <Avatar className="h-8 w-8 bg-[var(--primary)]">
                <AvatarFallback className="bg-[var(--primary)] text-[var(--primary-foreground)]">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold">AI Assistant</h1>
                <p className="text-xs text-[var(--muted-foreground)]">Online</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-2 md:p-4">
            <div className="flex flex-col gap-2 md:gap-3">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-8 md:py-12">
                  <Bot className="h-10 w-10 md:h-12 md:w-12 text-[var(--muted-foreground)] mb-4" />
                  <h2 className="text-lg md:text-xl font-semibold text-[var(--muted-foreground)] mb-2">Welcome to ConnectX</h2>
                  <p className="text-[var(--muted-foreground)]">Start a conversation by typing a message below.</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-end space-x-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className={`h-7 w-7 md:h-8 md:w-8 ${message.role === "user" ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"}`}>
                      <AvatarFallback className={`${message.role === "user" ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"} text-[var(--primary-foreground)]`}>
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col max-w-[80vw] md:max-w-[60%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl px-4 py-2 shadow-md text-sm md:text-base ${message.role === "user"
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-md"
                          : "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-bl-md"
                          }`}
                      >
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <p key={`${message.id}-${i}`}>{part.text}</p>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                      <span className="text-xs text-[var(--muted-foreground)] mt-1">
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <Avatar className="h-7 w-7 md:h-8 md:w-8 bg-[var(--secondary)]">
                      <AvatarFallback className="bg-[var(--secondary)] text-[var(--primary-foreground)]">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl px-4 py-2 shadow-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-2 md:p-4 border-t border-[var(--border)] bg-[var(--background)]/95 sticky bottom-0 z-20">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-[var(--primary)] text-sm md:text-base rounded-full px-4 py-2 shadow-md"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-full shadow-md"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Right Panel - Contact Info */}
      {isContactPanelOpen && (!isMobile || !showSidebarMobile) && (
        <div className="hidden md:block w-80 bg-[var(--sidebar)] border-l border-[var(--sidebar-border)] flex-shrink-0">
          <ContactPanel />
        </div>
      )}
    </div>
  )
}