import React from 'react';

const ChatCard = () => (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 shadow-lg h-full flex flex-col">
        <div className="bg-white rounded-full px-4 py-2 self-start mb-4">
            <p className="text-sm font-semibold text-purple-700">Yes!</p>
        </div>
        <div className="space-y-3 mt-auto">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full p-2">
                <img 
                    src="https://placehold.co/40x40/ffffff/000000?text=A" 
                    alt="User Avatar" 
                    className="w-8 h-8 rounded-full"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/ffffff/000000?text=Err'; }}
                />
                <p className="ml-3 text-white text-sm font-medium">Yes, Act!!</p>
                <div className="ml-auto w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full p-2">
                <img 
                    src="https://placehold.co/40x40/ffffff/000000?text=B" 
                    alt="User Avatar" 
                    className="w-8 h-8 rounded-full"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/ffffff/000000?text=Err'; }}
                />
                <p className="ml-3 text-white text-sm font-medium">Texas Hold Em</p>
                <div className="ml-auto w-4 h-4 bg-white rounded-full"></div>
            </div>
        </div>
    </div>
);

export default ChatCard;
