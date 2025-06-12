import dayjs from 'dayjs';
import React from 'react';
import { Link, useLoaderData } from 'react-router';

const FoodDetails = () => {
  const food = useLoaderData();
  const expireDate = dayjs(food.expire);

  
  const daysUntilExpire = expireDate.diff(dayjs(), 'days');

  

 
  const getUrgencyBadge = () => {
    if (daysUntilExpire <= 0) return { text: 'Expired', color: 'bg-red-100 text-red-800' };
    if (daysUntilExpire <= 1) return { text: 'Expires today!', color: 'bg-red-100 text-red-800' };
    if (daysUntilExpire <= 3) return { text: 'Expires soon!', color: 'bg-orange-100 text-orange-800' };
    return null;
  };

  const urgencyBadge = getUrgencyBadge();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb  */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Food Details</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Main card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
     
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img
            src={food.img}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {urgencyBadge && (
            <span className={`absolute top-4 right-4 ${urgencyBadge.color} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
              {urgencyBadge.text}
            </span>
          )}
        </div>

       {/* food name and quantity  */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{food.name}</h1>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {food.quantity} available
            </span>
          </div>

          {/* Meta information */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{food.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Expires: {expireDate.format('MMMM D, YYYY')} ({daysUntilExpire > 0 ? `${daysUntilExpire} days left` : `${daysUntilExpire*-1} days ago`})</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{food.notes}</p>
          </div>

          {/* Donor info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Donated by</h3>
            <div className="flex items-center">
              <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 font-medium">
                {food.userName.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{food.userName}</p>
                <p className="text-sm text-gray-500">{food.userEmail}</p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            <Link
              to="#"
              className="w-full md:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-center transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Request This Food
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;