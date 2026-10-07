'use client';

import { useEffect } from 'react';

export default function DevelopersPage() {
  useEffect(() => {
    window.location.replace('/mcp-landing.html');
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0e1c16', color: '#f6f1e2', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8 }}>
          Redirecting to the developer experience…
        </p>
        <a href="/mcp-landing.html" style={{ color: '#18c46c', textDecoration: 'underline' }}>
          Open the developer page
        </a>
      </div>
    </main>
  );
}
