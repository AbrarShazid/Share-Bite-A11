import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {

  const { createUser, signGoogle } = use(AuthContext)


  const handleReg = (e) => {
    e.preventDefault();
    const form = e.target
    const email = form.email.value
    const pass = form.password.value


    if (!/[A-Z]/.test(pass)) {
      toast.error("Password must include at least one uppercase letter.", {

        style: {
          border: '1px solid gray',
          backgroundColor: "#f2555d",
          padding: '6px',
          color: 'white',
        }



      });
      return;
    }

    if (!/[a-z]/.test(pass)) {
      toast.error("Password must include at least one lowercase letter.", {

        style: {
          border: '1px solid gray',
          backgroundColor: "#f2555d",
          padding: '6px',
          color: 'white',
        }



      });
      return;
    }
    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters long.", {

        style: {
          border: '1px solid gray',
          backgroundColor: "#f2555d",
          padding: '6px',
          color: 'white',
        }



      });
      return;
    }









    createUser(email, pass)
      .then(result => {

        toast.success("Create Account Successfully.")
        e.target.reset()
      })
      .catch(err => {

        if (err == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
          toast.error('This email already registered.')
          return;
        }
        toast.error(`Error->${err.message}`)


      })



  }
  // google sign in 


  const registerGoogle = () => {
    console.log("asd");

    signGoogle()
      .then(res => {
        toast.success('Successfully Log in.')

      })
      .catch(err => {
        toast.error(`error ${err.message}`)

      })
  }




  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-[5%]">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#ff6d03] ">
          Register
        </h2>

        <form onSubmit={handleReg} className="space-y-4 ">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff6d03]"
              placeholder="Enter your name"
              required
            />
          </div>

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
              Photo URL
            </label>
            <input
              name="photoUrl"
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff6d03]"
              placeholder="Link to your photo"
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
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#ff6d03] font-bold underline">Login</span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#ff6d03] text-white font-semibold rounded hover:bg-[#ff7c47] transition"
          >
            Register
          </button>
        </form>

        <div className="mt-6 inter">
          <p className="text-center text-gray-500 text-sm mb-2">
            Or register with
          </p>
          <button
            onClick={registerGoogle}
            className="w-full flex items-center justify-center gap-2 py-2 border border-[#ff6d03] rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;