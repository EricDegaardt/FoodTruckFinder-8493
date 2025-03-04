import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { FaTags } from 'react-icons/fa';

export default function TruckCard({ truck }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-48">
        <ImageSlider images={truck.photos} className="h-full" />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <img
            src={truck.logo}
            alt={`${truck.name} logo`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h3 className="font-bold text-lg">{truck.name}</h3>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{truck.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {truck.foodTypes.map((type, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-primary font-semibold">{truck.location}</span>
          <Link to={`/truck/${truck.id}`} className="btn-secondary">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}