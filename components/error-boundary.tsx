"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center p-4 overflow-hidden relative font-sans">
          {/* Warm Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-[#fff7ed] via-[#ffedd5] to-[#fecaca] -z-10" />

          <div className="max-w-lg mx-auto text-center relative z-10">
            <div className="border border-white/80 bg-white/40 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-2xl ring-1 ring-white/60">
              <div className="flex items-center justify-center mb-8">
                <div className="p-5 bg-orange-100 rounded-full shadow-inner relative">
                  <div className="absolute inset-0 bg-orange-400/20 animate-ping rounded-full" />
                  <AlertTriangle className="w-10 h-10 text-orange-500 drop-shadow-sm relative z-10" />
                </div>
              </div>

              <h2 className="text-3xl font-black text-stone-950 mb-4 tracking-tighter uppercase">Composition Anomaly</h2>

              <p className="text-stone-800 font-bold text-sm mb-10 leading-relaxed max-w-70 mx-auto">
                A musical note has drifted out of alignment.<br />
                Attempting to retune the sunset...
              </p>

              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-stone-950 text-white hover:bg-stone-800 transition-all rounded-2xl font-black text-xs tracking-[0.3em] uppercase shadow-lg active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-orange-400" />
                RESYNC HARMONY
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
