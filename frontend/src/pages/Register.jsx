import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import img from '../assets/signup.jpg'; // Adjust the path as necessary

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', data, { withCredentials: true });
      login(res.data.user);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-900 to-green-400 items-center justify-center">
        <img
          src={img}
          alt="Sign Up Illustration"
          className="w-3/4 max-w-md"
        />
      </div>
      {/* Right Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-8 py-10">
          <h2 className="text-3xl font-bold mb-2 text-center">Sign Up</h2>
          <p className="text-gray-500 text-center mb-6">To Create Account, Please Fill in the Form Below.</p>

          {/* Full Name */}
          <label className="block mb-1 font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 p-2 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

          {/* Email */}
          <label className="block mb-1 font-medium text-gray-700 mt-3">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full border border-gray-300 p-2 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("email", { 
              required: "Email is required", 
              pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" } 
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

          {/* Password */}
          <label className="block mb-1 font-medium text-gray-700 mt-3">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 p-2 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

          {/* Confirm Password */}
          <label className="block mb-1 font-medium text-gray-700 mt-3">Confirm Password</label>
          <input
            type="password"
            placeholder="Retype password"
            className="w-full border border-gray-300 p-2 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("confirmPassword", { 
              required: "Confirm password is required",
              validate: (value) => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>}

          {/* Sign Up Button */}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition mb-4 mt-4">
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-2 text-gray-400">Or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account? <Link to="/login" className="text-green-500 font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;