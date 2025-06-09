import React, { useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItemClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-[#ff6d03] font-medium text-white"
      : "hover:text-gray-300";

  const centerItem = (
    <>
      <NavLink to="/" className={navItemClass}>Home</NavLink>
      <NavLink to="/available-food" className={navItemClass}>Available Food</NavLink>
      <NavLink to="/add-food" className={navItemClass}>Add Food</NavLink>
      <NavLink to="/manage-my-food" className={navItemClass}>Manage My Food</NavLink>
      <NavLink to="/food-request" className={navItemClass}>My Food Request</NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 text-white border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to={'/'}>
            <div className="flex gap-2 items-center">
          <img className="w-10 h-10 rounded-full" src="/Favicon.png" alt="Logo" />
          <h1 className="font-bold text-2xl text-white">
            ShareBite<span className="text-[#ff6d03] font-extrabold">.</span>
          </h1>
        </div>
        </NavLink>
      

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-7">{centerItem}</div>

        {/* Right Side (Auth Buttons) */}
        <div className="hidden lg:flex gap-4">
          <NavLink to="/login" className={navItemClass}>Login</NavLink>
          <NavLink to="/register" className={navItemClass}>Register</NavLink>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-start gap-4 px-6 pb-4">
          {centerItem}
          <NavLink to="/login" className={navItemClass}>Login</NavLink>
          <NavLink to="/register" className={navItemClass}>Register</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
