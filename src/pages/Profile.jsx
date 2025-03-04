import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaTruck, FaPen } from 'react-icons/fa';

export default function Profile() {
  const { user } = useAuth();

  // Mock data - replace with actual user data
  const myTrucks = [
    {
      id: 1,
      name: "Taco Express",
      location: "Downtown",
      status: "active"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name</label>
            <p>{user.name}</p>
          </div>
          <div>
            <label className="font-semibold">Email</label>
            <p>{user.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Food Trucks</h2>
          <Link to="/add-listing" className="btn-primary">
            Add New Truck
          </Link>
        </div>
        <div className="space-y-4">
          {myTrucks.map(truck => (
            <div key={truck.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <FaTruck className="text-2xl text-primary" />
                <div>
                  <h3 className="font-semibold">{truck.name}</h3>
                  <p className="text-gray-600">{truck.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {truck.status}
                </span>
                <Link 
                  to={`/edit-listing/${truck.id}`}
                  className="p-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <FaPen />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}