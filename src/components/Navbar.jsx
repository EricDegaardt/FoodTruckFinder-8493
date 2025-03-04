import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaTruck, FaUser, FaCalendar } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <FaTruck className="text-primary text-2xl" />
              <span className="font-bold text-xl text-dark">FoodTruckr</span>
            </Link>
            <Link 
              to="/book-event" 
              className="flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors"
            >
              <FaCalendar />
              <span>Book Event</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/add-listing" className="btn-primary">
                  Add Truck
                </Link>
                <Link to="/profile" className="flex items-center space-x-2">
                  <FaUser />
                  <span>{user.name}</span>
                </Link>
                <button onClick={logout} className="btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">Login</Link>
                <Link to="/register" className="btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}