'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl max-w-md w-full text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
            <p className="text-slate-400 mb-8">
              A critical error occurred in the application. Please reload the terminal to continue operations.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Clear Cache & Reload
            </button>
            <div className="mt-4 p-4 bg-slate-950 rounded border border-slate-800 text-left overflow-x-auto">
              <pre className="text-xs text-red-300 font-mono">
                {this.state.error?.message || 'Unknown Error'}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
