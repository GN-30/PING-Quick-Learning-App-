import React from 'react';
import HeadphoneIcon from '../common/HeadPhoneIcon';
const ArtistStatsCard = () => (
    <div className="relative bg-gradient-to-br from-cyan-400 to-teal-600 rounded-3xl p-6 text-white shadow-lg h-full flex flex-col justify-between">
        <div className="absolute top-4 left-4 bg-black bg-opacity-20 rounded-full p-2">
            <HeadphoneIcon />
        </div>
        <div className="mt-auto">
            <img 
                src="https://placehold.co/250x250/2d3748/ffffff?text=Artist" 
                alt="Artist" 
                className="w-full h-48 object-cover rounded-2xl mb-4"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/250x250/2d3748/ffffff?text=Image+Error'; }}
            />
            <p className="text-3xl font-bold">4.9 M</p>
            <p className="text-sm opacity-80">Listeners — This week</p>
        </div>
    </div>
);

export default ArtistStatsCard;