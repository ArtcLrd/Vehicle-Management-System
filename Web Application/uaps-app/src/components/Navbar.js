import React from 'react';
import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import '../styles/Navbar.css';

function Navbar() {
    const navRef=useRef();
    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");
    };
  return (
    <header className='navbar'>       
        <a href="/"><img src={Logo} alt='Logo'/></a>
        <div>
            <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/book">Book</a>
                <a href="/locate">Locate</a>
                <a href="/contact">Contact us</a>
                <a href="/about">About us</a>
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                <FaTimes/>
                </button>
            </nav>
        </div>       
        <button className='nav-btn' onClick={showNavbar}>
            <FaBars/>
        </button>
    </header>
  )
}

export default Navbar