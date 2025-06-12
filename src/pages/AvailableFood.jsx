import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router';

import dayjs from 'dayjs';

const fetchFoods = async (sortOption) => {
  const res = await axios.get("http://localhost:5000/available-food", {
    params: { sort: sortOption }
  });
  return res.data;
};

const AvailableFood = () => {
  const [sortOption, setSortOption] = useState('');

  const { data: foods = [], isLoading, error } = useQuery({
    queryKey: ['allFoods', sortOption],
    queryFn: () => fetchFoods(sortOption),
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (error) return (
    <div className="mt-8 text-2xl font-semibold text-red-600 text-center">
      Error fetching data.
    </div>
  );

  return (
    <div className="px-[3%]">
      <div className="my-5 text-center ">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Available <span className="text-orange-500">Food</span> Donations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through available food donations.
        </p>
      </div>

      <div className='flex flex-row-reverse'>


        <div className="dropdown dropdown-end ml-auto mb-6 ">
          <label tabIndex={0} className="btn m-1">Sort By</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={() => setSortOption("expire-asc")}>Expire Early</button></li>
            <li><button onClick={() => setSortOption("expire-desc")}>Expire Later</button></li>
          </ul>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white p-6 rounded-2xl shadow-md border border-[#ff6d0332] "
          >
            <div className="relative overflow-hidden rounded-xl h-48 mb-4">
              <img
                src={food.img}
                alt={food.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                className="inline-block mt-auto text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300  hover:shadow-xl hover:-translate-y-1            "
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
