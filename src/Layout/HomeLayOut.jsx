import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const HomeLayOut = () => {
  return (
    <div className='flex flex-col min-h-screen  '>
      
      <Navbar></Navbar>
      <main className='flex-grow px-[3%]'>
         <Outlet></Outlet>
      </main>
     
      <Footer></Footer>
      
    </div>
  );
};

export default HomeLayOut;