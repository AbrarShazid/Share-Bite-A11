import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

const LogIn = () => {
  return (
      <section className="min-h-screen flex items-center justify-center  px-4 py-[5%]">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#ff6d03] ">
          Login
        </h2>

        <form 
        // onSubmit={handleLogin} 
        className="space-y-4 ">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff6d03]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff6d03]"
              placeholder="Enter your password"
              required
            />
          </div>

        

          <div className="text-sm text-gray-600 text-right">
            
              Don't have an account?{" "}<Link to="/register">
              <span className="text-[#ff6d03] font-bold underline">Register</span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#ff6d03] text-white font-semibold rounded hover:bg-[#ff7c47] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 inter">
          <p className="text-center text-gray-500 text-sm mb-2">
            Or login with
          </p>
          <button
            // onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 border border-[#ff7c47] rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogIn;