import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhone, FaCalendar } from 'react-icons/fa';
import ImageSlider from '../components/ImageSlider';

export default function TruckDetails() {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const trucks = {
    1: {
      id: 1,
      name: "Taco Express",
      logo: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=500",
      photos: [
        "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000",
        "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1000",
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1000"
      ],
      description: "Authentic Mexican street tacos made with fresh ingredients and traditional recipes passed down through generations.",
      location: "Downtown",
      hours: "11:00 AM - 9:00 PM",
      phone: "(555) 123-4567",
      menu: [
        { name: "Carne Asada Taco", price: 3.99 },
        { name: "Chicken Taco", price: 3.49 },
        { name: "Fish Taco", price: 4.49 }
      ]
    },
    2: {
      id: 2,
      name: "Pizza Wheels",
      logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      photos: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000",
        "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1000",
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000"
      ],
      description: "Authentic Italian pizza made in a wood-fired oven on wheels.",
      location: "Uptown",
      hours: "12:00 PM - 10:00 PM",
      phone: "(555) 987-6543",
      menu: [
        { name: "Margherita Pizza", price: 12.99 },
        { name: "Pepperoni Pizza", price: 14.99 },
        { name: "Italian Salad", price: 6.99 }
      ]
    }
  };

  const truck = trucks[id];

  if (!truck) return <div>Truck not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="h-64">
          <ImageSlider images={truck.photos} className="h-full rounded-t-lg" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={truck.logo}
                alt={`${truck.name} logo`}
                className="w-16 h-16 rounded-full border-2 border-white"
              />
              <h1 className="text-3xl font-bold text-white">{truck.name}</h1>
            </div>
            <Link
              to={`/book-event?truck=${id}`}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <FaCalendar />
              <span>Book This Truck</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-600 mb-6">{truck.description}</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>{truck.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-primary" />
                <span>{truck.hours}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-primary" />
                <span>{truck.phone}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <div className="space-y-4">
              {truck.menu.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-primary font-semibold">
                    ${item.price.toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}