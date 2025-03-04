import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUpload, FaPlus, FaTimes } from 'react-icons/fa';

export default function AddListing() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([{ name: '', price: '' }]);
  const [eventBundles, setEventBundles] = useState([{
    name: '',
    description: '',
    peopleCount: '',
    price: ''
  }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    navigate('/');
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', price: '' }]);
  };

  const addEventBundle = () => {
    setEventBundles([...eventBundles, {
      name: '',
      description: '',
      peopleCount: '',
      price: ''
    }]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Your Food Truck</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Business Name</label>
          <input type="text" className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-2">Logo</label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <FaUpload className="mx-auto text-2xl mb-2" />
            <p>Drop your logo here or click to upload</p>
          </div>
        </div>

        <div>
          <label className="block mb-2">Photos</label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <FaUpload className="mx-auto text-2xl mb-2" />
            <p>Drop photos here or click to upload</p>
          </div>
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2">Menu Items</label>
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Item name"
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="w-24 p-2 border rounded"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...menuItems];
                      newItems.splice(index, 1);
                      setMenuItems(newItems);
                    }}
                    className="text-red-500"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMenuItem}
            className="mt-2 flex items-center text-primary"
          >
            <FaPlus className="mr-1" /> Add Item
          </button>
        </div>

        <div>
          <label className="block mb-2">Event Bundles</label>
          <div className="space-y-4">
            {eventBundles.map((bundle, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder="Bundle name (e.g., Birthday Party Package)"
                    className="flex-1 p-2 border rounded"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newBundles = [...eventBundles];
                        newBundles.splice(index, 1);
                        setEventBundles(newBundles);
                      }}
                      className="text-red-500 ml-2"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                <textarea
                  placeholder="Bundle description"
                  className="w-full p-2 border rounded"
                  rows="2"
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Number of people"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Price (SEK)"
                    className="flex-1 p-2 border rounded"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addEventBundle}
            className="mt-2 flex items-center text-primary"
          >
            <FaPlus className="mr-1" /> Add Event Bundle
          </button>
        </div>

        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter your primary location"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
        >
          Add Listing
        </motion.button>
      </form>
    </div>
  );
}