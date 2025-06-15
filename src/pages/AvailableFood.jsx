import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { TbColumns2, TbColumns3 } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import LoadingSpinner from '../Components/LoadingSpinner'

import { useDebounce } from 'use-debounce';

const fetchFoods = async (sortOption,searchQuery) => {
  const res = await axios.get("https://share-bite-a11-server.vercel.app/available-food", {
    params: { sort: sortOption,search:searchQuery }
  });
  return res.data;
};

const AvailableFood = () => {  
  const [columns, setColumns] = useState(3); 
  const [sortOption, setSortOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 800);  

  const handleSort = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const { data: foods = [], isLoading, error } = useQuery({
    queryKey: ['allFoods', sortOption,debouncedSearchQuery],
    queryFn: () => fetchFoods(sortOption,debouncedSearchQuery),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return (
    <div className="mt-8 text-2xl font-semibold text-red-600 text-center">
      Error fetching data.
    </div>
  );

  return (
    <div className="px-[3%] mb-[2%]">
      <div className="my-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Available <span className="text-orange-500">Food</span> Donations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through available food donations.
        </p>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
         <IoIosSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400"  />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Column Toggle */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setColumns(2)}
              className={`px-3 py-1 rounded-md ${columns === 2 ? 'bg-white shadow-sm' : ''}`}
            >
              <TbColumns2 className='w-5 h-5' />
            </button>
            <button 
              onClick={() => setColumns(3)}
              className={`px-3 py-1 rounded-md ${columns === 3 ? 'bg-white shadow-sm' : ''}`}
            >
              <TbColumns3 className='w-5 h-5' />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn m-1 flex items-center gap-1"
            >
              Sort By
              <svg 
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 z-10 mt-1 w-40 bg-white shadow-lg rounded-md border border-gray-200">
                <li>
                  <button 
                    onClick={() => handleSort("expire-asc")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Expire Early
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSort("expire-desc")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Expire Later
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Food Grid - columns state used for class but no actual functionality */}
      <div className={`grid gap-8 ${columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white p-6 rounded-2xl shadow-md border border-[#ff6d0332]"
          >
            <div className="relative overflow-hidden rounded-xl h-48 mb-4">
              <img
                src={food.img}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-center lg:text-left text-2xl font-semibold text-[#ff6d03] mb-2">
              {food.name}
            </h3>
            <div className="flex flex-col lg:flex-row flex-wrap items-center gap-2 text-sm mb-3">
              <span className="bg-[#fff3e7] text-[#ff6d03] font-medium px-3 py-1 rounded-full">
                Quantity: {food.quantity}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                📍 {food.location}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Expires: {dayjs(food.expire).format('DD/MM/YYYY')}
            </div>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{food.notes}</p>
            <div className="flex justify-center">
              <Link
                to={`/food/${food._id}`}
                className="inline-block mt-auto text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFood;