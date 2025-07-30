import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow">
      <Link to="/" className="text-xl font-bold text-green-600">Tasko</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium">Hi, {user.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-green-600">Login</Link>
            <Link to="/register" className="bg-green-500 text-white px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
