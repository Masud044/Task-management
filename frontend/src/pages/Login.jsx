import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import img from '../assets/login.jpeg'; // Adjust the path as necessary

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', data, { withCredentials: true });
      login(res.data.user);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-900 to-green-400 items-center justify-center">
        <img
          src={img}
          alt="Login Illustration"
          className="w-3/4 max-w-md"
        />
      </div>
      {/* Right Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-8 py-10">
          <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
          <p className="text-gray-500 text-center mb-6">WelcomeBack, Please Enter your Details to Log In.</p>
          
          {/* Email Field */}
          <label className="block mb-1 font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("email", { 
              required: "Email is required", 
              pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" } 
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

          {/* Password Field */}
          <label className="block mb-1 font-medium text-gray-700 mt-3">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 p-2 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-2 mb-4">
            <label className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-green-500 text-sm hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition mb-4">
            Log In
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-2 text-gray-400">Or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account? <Link to="/register" className="text-green-500 font-semibold hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;