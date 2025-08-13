import React from 'react';
import Header from '../layout/Header';
import ArtistStatsCard from '../cards/ArtistStatsCard';
import ChatCard from '../cards/ChatCard';
import LiveEventCard from '../cards/LiveEventCard';
import VerifiedArtistsCard from '../cards/VerifiedArtistsCard';
import GlobeIcon from '../common/GlobeIcon';

const DiscoverPage = () => (
    <div className="max-w-screen-xl mx-auto">
        
        <main className="px-4 sm:px-8 md:px-16 mt-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="text-sm font-semibold text-gray-800">Our Mission</div>
                <div className="md:col-span-1"></div>
                <div className="text-sm font-semibold text-gray-800 md:text-right">Search topics or sources</div>
            </div>

            <div className="text-center my-10">
                <h1 style={{ fontFamily: "'Lora', serif" }} className="text-7xl md:text-9xl font-medium text-black tracking-tighter">
                    Discover
                </h1>
                <h1 style={{ fontFamily: "'Lora', serif" }} className="text-7xl md:text-9xl font-medium text-black tracking-tighter -mt-4">
                    Knowledge
                </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-16 text-center text-gray-700">
                <div className="flex items-center">
                    <GlobeIcon />
                    <span>Personalized, bite-size insights from topics you love</span>
                </div>
                <div className="flex items-center">
                    <GlobeIcon />
                    <span>Go deeper with AI—concepts, briefings, and quizzes</span>
                </div>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-[450px]">
                <ArtistStatsCard />
                <ChatCard />
                <LiveEventCard />
                <VerifiedArtistsCard />
            </div>
        </main>
    </div>
);

export default DiscoverPage;