import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Save to state so UI can show a helpful message
    this.setState({ error, info });
    // Also log to console for devtools
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  render() {
    const { error, info } = this.state;
    if (!error) return this.props.children;

    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'white', color: '#111', padding: 20, zIndex: 9999,
        overflow: 'auto', fontFamily: 'monospace'
      }}>
        <h2 style={{ marginTop: 0 }}>Erro na aplicação</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error && (error.message || error))}</pre>
        {info && info.componentStack && (
          <details style={{ marginTop: 12 }}>
            <summary>Stack</summary>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{info.componentStack}</pre>
          </details>
        )}
        <div style={{ marginTop: 12 }}>Abra o console do navegador para ver mais detalhes.</div>
      </div>
    );
  }
}
