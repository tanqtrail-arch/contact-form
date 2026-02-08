import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: 'center', fontFamily: "'Noto Sans JP', sans-serif" }}>
          <h2 style={{ color: '#C44B4B', marginBottom: 12 }}>エラーが発生しました</h2>
          <p style={{ color: '#5A6B5A', fontSize: 14, marginBottom: 16 }}>
            ページの読み込みに失敗しました。再読み込みしてください。
          </p>
          <pre style={{ fontSize: 12, color: '#888', whiteSpace: 'pre-wrap', maxWidth: 600, margin: '0 auto' }}>
            {this.state.error.message}
          </pre>
          <button
            onClick={() => location.reload()}
            style={{ marginTop: 20, padding: '10px 24px', borderRadius: 8, border: 'none', background: '#1B6B4A', color: '#fff', cursor: 'pointer', fontSize: 14 }}
          >
            再読み込み
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
