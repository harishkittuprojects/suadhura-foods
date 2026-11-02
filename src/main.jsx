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
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF5EC] flex items-center justify-center p-6 text-slate-800 font-sans">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full border border-[#EDE1D1] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#7D0A14]/10 text-[#7D0A14] flex items-center justify-center mx-auto text-2xl font-bold">
              ⚡
            </div>
            <h2 className="text-xl font-black text-[#3D040A]">Reloading Sumadhura Foods</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Click below to refresh the page with the latest update:
            </p>
            <div className="p-3 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-left text-[11px] text-slate-600 font-mono overflow-auto max-h-32">
              {this.state.error?.message || String(this.state.error)}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Refresh Application Now
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
