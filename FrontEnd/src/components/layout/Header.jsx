import React from 'react';
import { Link } from 'react-router-dom';
import LogoutWrapper from '../../Wrapper/Logoutwrapper';
import { useSelector } from 'react-redux';

const Header = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    return(
        <header className="py-6 px-4 sm:px-8 md:px-16 flex justify-between items-center">
        <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded-full"></div>
            <a href="#" className="ml-4 text-sm font-medium text-gray-600 hover:text-black">/ hello@knowledgesphere.app</a>
        </div>
        <nav className={`${isAuthenticated ? 'hidden' : 'hidden md:flex'} items-center space-x-8`}>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Our Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">How it works</a>
            <Link to='signup' href="#" className="text-sm font-medium text-gray-600 hover:text-black">Signup</Link>
        </nav>
        <div>
            <LogoutWrapper>
                <Link to='/login' className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                    Login
                </Link>
            </LogoutWrapper>
        </div>
    </header>
    )
}

export default Header;