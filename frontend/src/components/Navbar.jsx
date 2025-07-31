import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-emerald-900 p-4 shadow">
      <Link to="/" className="text-xl font-bold text-white">Tasko</Link>
      <div className="flex items-center justify-start gap-4">
        {user ? (
          <>
           <Link to="/" className="text-white">TaskList</Link>
           <Link to="/" className="text-white">spin</Link>
            <span className="font-medium text-white">Hi, {user.name}</span>
            <button onClick={logout} className="bg-emerald-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-green-500 text-white px-3 py-1 rounded">Login</Link>
           
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
