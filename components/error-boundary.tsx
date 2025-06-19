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
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="border border-red-600/30 bg-red-600/5 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
              </div>

              <h2 className="text-xl font-bold text-red-400 mb-4 font-mono">COMPONENT ERROR</h2>

              <p className="text-red-400/80 text-sm mb-6 font-mono">
                A neural pathway has been corrupted. Attempting recovery...
              </p>

              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 border border-green-500/30 bg-green-500/5 text-green-400 hover:bg-green-500/10 transition-colors font-mono text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                RETRY CONNECTION
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
