import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 mx-2">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-light mb-8 text-wrap text-center">
        Kayaknya kamu menjelajah terlalu jauh nih, balik lagi yuk
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition duration-300"
      >
        Home Page
      </Link>
    </div>
  );
};

export default NotFound;