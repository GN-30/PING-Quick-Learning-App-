
import React from 'react';

const LiveEventCard = () => (
    <div className="bg-black rounded-3xl overflow-hidden shadow-lg h-full">
        <img 
            src="https://placehold.co/300x400/000000/ffffff?text=Live+Event" 
            alt="Live event" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x400/000000/ffffff?text=Image+Error'; }}
        />
    </div>
);

export default LiveEventCard;