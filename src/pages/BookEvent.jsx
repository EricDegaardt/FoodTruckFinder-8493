import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaUsers, FaTruck } from 'react-icons/fa';
import { format } from 'date-fns';

export default function BookEvent() {
  const [searchParams] = useSearchParams();
  const truckId = searchParams.get('truck');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    description: '',
    attendees: '',
    selectedTruck: truckId || ''
  });

  // Mock data - replace with actual API calls
  const trucks = [
    {
      id: '1',
      name: "Taco Express",
      type: "Mexican",
      image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=500",
      rating: 4.5,
    },
    {
      id: '2',
      name: "Pizza Wheels",
      type: "Italian",
      image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=500",
      rating: 4.7,
    }
  ];

  const selectedTruck = trucks.find(truck => truck.id === truckId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        {selectedTruck ? `Book ${selectedTruck.name}` : 'Book a Food Truck'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!selectedTruck && (
          <div>
            <label className="block mb-2">Select Food Truck</label>
            <div className="space-y-4">
              {trucks.map((truck) => (
                <button
                  type="button"
                  key={truck.id}
                  onClick={() => setFormData({ ...formData, selectedTruck: truck.id })}
                  className={`w-full p-4 border rounded-lg flex items-center space-x-4 ${
                    formData.selectedTruck === truck.id ? 'border-primary bg-primary/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={truck.image}
                    alt={truck.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">{truck.name}</h3>
                    <p className="text-gray-500">{truck.type}</p>
                    <div className="flex items-center text-yellow-400">
                      {'★'.repeat(Math.floor(truck.rating))}
                      <span className="text-gray-400 ml-1">{truck.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Date</label>
            <div className="relative">
              <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full pl-10 p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Time</label>
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2">Number of Attendees</label>
          <div className="relative">
            <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="attendees"
              value={formData.attendees}
              onChange={handleChange}
              placeholder="Enter expected number of guests"
              className="w-full pl-10 p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Event Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your event (type of event, special requirements, etc.)"
            rows="4"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn-primary"
        >
          Book Event
        </motion.button>
      </form>
    </div>
  );
}