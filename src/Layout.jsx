import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          html {
            font-size: 18px;
          }
          
          @media (max-width: 380px) {
            html {
              font-size: 16px;
            }
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          
          button, input, textarea {
            font-size: inherit;
          }
          
          /* High contrast mode support */
          @media (prefers-contrast: high) {
            button {
              border: 3px solid currentColor !important;
            }
          }
          
          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            *, ::before, ::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
      <main className="pb-8">
        {children}
      </main>
    </div>
  );
}
