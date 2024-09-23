"use client";

import { useState, useEffect } from 'react';
import {Link} from 'react-scroll'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false); // Close the menu in desktop mode
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="flex justify-between items-center p-4 bg-transparent">
            {/* Desktop Menu */}
            

            {/* Logo */}
            <div className="md:flex-grow md:flex ">
                <img src="/images/logowhite.png" className="h-16 w-auto md:h-40" alt="Logo" />
            </div>

            <div className="hidden md:flex gap-12 items-center md:mr-24">
                <Link to='about-us' smooth = {true} duration={1000}><button className="text-white text-lg" >About Us</button></Link>
                <Link to='contact' smooth ={true} duration={500}><button className="text-white text-lg" >Contact</button></Link>
            </div>

            {/* Placeholder for alignment */}
           

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white text-3xl">
                    {isOpen ? 'X' : '☰'}
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-2/3 bg-white text-black shadow-lg transition-transform duration-300 transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } z-20`}
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-3xl text-black"
                >
                    X
                </button>

                <div className="absolute left-6 top-5">
                    <img src="/images/logoblack.png" className="h-12 w-auto" alt="Logo" />
                </div>

                <ul className="mt-24 ml-6">
                    <li className="mb-8">
                        <Link to='about-us' duration={1000} smooth={true}>
                        <button className="text-lg font-thin text-gray-700" onClick={toggleMenu}>
                            About Us
                        </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='contact' duration={500} smooth={true}><button className="text-lg font-thin text-gray-700" onClick={toggleMenu}>
                            Contact
                        </button>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Background Overlay for Mobile Menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleMenu}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
