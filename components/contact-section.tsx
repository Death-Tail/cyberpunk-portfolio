"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Mail, Github, Linkedin, Send } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after submission
      setFormState({
        name: "",
        email: "",
        message: "",
      })

      // Reset success message after a delay
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="font-mono text-sm mb-6 text-zinc-400">
          <p className="mb-4">
            Need to establish a secure connection? Use any of these encrypted channels to reach me in the digital
            underground.
          </p>
          <p>Response time: {"<"} 24 hours. Encryption level: Maximum.</p>
        </div>

        <div className="space-y-4">
          <a
            href="mailto:contact@rockybarbarian.com"
            className="flex items-center gap-3 p-3 border border-magenta-500/30 rounded-sm hover:bg-magenta-500/10 transition-colors group"
          >
            <div className="p-2 bg-magenta-500/10 rounded-sm text-magenta-400 group-hover:bg-magenta-500/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-magenta-400 font-mono text-sm">EMAIL</div>
              <div className="text-zinc-400 text-sm">contact@rockybarbarian.com</div>
            </div>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 border border-cyan-500/30 rounded-sm hover:bg-cyan-500/10 transition-colors group"
          >
            <div className="p-2 bg-cyan-500/10 rounded-sm text-cyan-400 group-hover:bg-cyan-500/20">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="text-cyan-400 font-mono text-sm">GITHUB</div>
              <div className="text-zinc-400 text-sm">github.com/rockybarbarian</div>
            </div>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 border border-green-500/30 rounded-sm hover:bg-green-500/10 transition-colors group"
          >
            <div className="p-2 bg-green-500/10 rounded-sm text-green-400 group-hover:bg-green-500/20">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-green-400 font-mono text-sm">LINKEDIN</div>
              <div className="text-zinc-400 text-sm">linkedin.com/in/rockybarbarian</div>
            </div>
          </a>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-magenta-400 mb-1">
              NAME<span className="text-cyan-400">_</span>ID
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800/50 border border-magenta-500/30 rounded-sm p-2 text-zinc-300 font-mono text-sm focus:outline-none focus:border-magenta-500 focus:ring-1 focus:ring-magenta-500/50"
              placeholder="ENTER_YOUR_NAME"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono text-cyan-400 mb-1">
              COMM<span className="text-magenta-400">_</span>LINK
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800/50 border border-cyan-500/30 rounded-sm p-2 text-zinc-300 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
              placeholder="YOUR@EMAIL.COM"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-mono text-green-400 mb-1">
              MESSAGE<span className="text-cyan-400">_</span>DATA
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-zinc-800/50 border border-green-500/30 rounded-sm p-2 text-zinc-300 font-mono text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 resize-none"
              placeholder="ENTER_YOUR_MESSAGE"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={cn(
                "w-full flex items-center justify-center gap-2 p-2 font-mono text-sm rounded-sm transition-colors",
                isSubmitted
                  ? "bg-green-500/20 border border-green-500 text-green-400"
                  : isSubmitting
                    ? "bg-magenta-500/20 border border-magenta-500 text-magenta-400"
                    : "bg-cyan-500/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/30",
              )}
            >
              {isSubmitted ? (
                <>MESSAGE SENT SUCCESSFULLY</>
              ) : isSubmitting ? (
                <>TRANSMITTING DATA...</>
              ) : (
                <>
                  SEND MESSAGE
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
