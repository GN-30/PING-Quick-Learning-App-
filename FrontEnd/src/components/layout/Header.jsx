import React from 'react';

const Header = () => (
    <header className="py-6 px-4 sm:px-8 md:px-16 flex justify-between items-center">
        <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded-full"></div>
            <a href="#" className="ml-4 text-sm font-medium text-gray-600 hover:text-black">/ book@ai-artist.io</a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Our Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Treatment</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Signup</a>
        </nav>
        <div>
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                Artist Login
            </button>
        </div>
    </header>
);

export default Header;