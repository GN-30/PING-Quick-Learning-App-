import React from "react";
import Header from "../layout/Header";
import ArtistStatsCard from "../cards/ArtistStatsCard";
import ChatCard from "../cards/ChatCard";
import LiveEventCard from "../cards/LiveEventCard";
import VerifiedArtistsCard from "../cards/VerifiedArtistsCard";
import GlobeIcon from "../common/GlobeIcon";

const DiscoverPage = () => (
  <div className="max-w-screen-xl mx-auto bg-gray-50">
    <main className="px-4 sm:px-8 md:px-16 mt-12 mb-20">
      {/* Top navigation hints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-gray-700">
        <div className="text-sm font-semibold">Our Mission</div>
        <div className="md:col-span-1"></div>
        <div className="text-sm font-semibold md:text-right">
          Search topics or sources
        </div>
      </div>

      {/* Hero / Title */}
      <div className="text-center my-10">
        <h1
          style={{ fontFamily: "'Lora', serif" }}
          className="text-7xl md:text-9xl font-extrabold text-gray-900 tracking-tighter drop-shadow-md"
        >
          Discover
        </h1>
        <h1
          style={{ fontFamily: "'Lora', serif" }}
          className="text-7xl md:text-9xl font-extrabold text-gray-900 tracking-tighter -mt-4 drop-shadow-md"
        >
          Knowledge
        </h1>
        <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Explore topics, insights, and curated content tailored just for you.
        </p>
      </div>

      {/* Features / Highlights */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-16 text-center text-gray-700">
        <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
          <GlobeIcon className="w-6 h-6 text-indigo-500" />
          <span className="font-medium">
            Personalized, bite-size insights from topics you love
          </span>
        </div>
        <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
          <GlobeIcon className="w-6 h-6 text-indigo-500" />
          <span className="font-medium">
            Go deeper with AI—concepts, briefings, and quizzes
          </span>
        </div>
      </div>

      {/* Cards / Stats */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-[450px]">
        <ArtistStatsCard className="hover:scale-105 transition-transform duration-300 shadow-xl" />
        <ChatCard className="hover:scale-105 transition-transform duration-300 shadow-xl" />
        <LiveEventCard className="hover:scale-105 transition-transform duration-300 shadow-xl" />
        <VerifiedArtistsCard className="hover:scale-105 transition-transform duration-300 shadow-xl" />
      </div>
    </main>
  </div>
);

export default DiscoverPage;
