import React from 'react';
import HeadphoneIcon from '../common/HeadPhoneIcon';
const ArtistStatsCard = () => (
    <div className="relative bg-gradient-to-br from-cyan-400 to-teal-600 rounded-3xl p-6 text-white shadow-lg h-full flex flex-col justify-between">
        <div className="absolute top-4 left-4 bg-black bg-opacity-20 rounded-full p-2">
            <HeadphoneIcon />
        </div>
        <div className="mt-auto">
            
            
            <p className="text-sm opacity-80">120K Reads  — This week</p>
        </div>
    </div>
);

export default ArtistStatsCard;