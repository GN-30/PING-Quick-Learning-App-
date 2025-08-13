import React from 'react';
import DiscoverPage from './components/pages/DiscoverPage';
export default function App() {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* It's common to place global link tags and styles in the public/index.html file,
              but for self-contained components, placing them here is fine.
            */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
            
            <style>{`
                body { font-family: 'Inter', sans-serif; }
            `}</style>

            <DiscoverPage />
        </div>
    );
}