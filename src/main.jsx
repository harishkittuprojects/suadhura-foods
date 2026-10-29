import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'aos/dist/aos.css';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured UI Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
              ⚡
            </div>
            <h2 className="text-xl font-black text-slate-900">Reloading Sumadhura Foods</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              We encountered a session state update. Click below to refresh your shopping experience:
            </p>
            <div className="p-3 bg-slate-100 rounded-xl text-left text-[11px] text-slate-600 font-mono overflow-auto max-h-32">
              {this.state.error?.message || String(this.state.error)}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Reset Session & Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
