import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUpload, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    hours: '',
    phone: '',
    logo: '',
    photos: [],
    foodTypes: [],
    menu: [],
    eventBundles: []
  });

  useEffect(() => {
    // Mock data - replace with API call
    const mockData = {
      name: "Taco Express",
      description: "Authentic Mexican street tacos made with fresh ingredients.",
      location: "Downtown",
      hours: "11:00 AM - 9:00 PM",
      phone: "(555) 123-4567",
      logo: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=500",
      photos: [
        "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000",
        "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1000"
      ],
      foodTypes: ["Mexican", "Tacos", "Street Food"],
      menu: [
        { name: "Carne Asada Taco", price: "3.99" },
        { name: "Chicken Taco", price: "3.49" }
      ],
      eventBundles: [
        {
          name: "Party Package",
          description: "Perfect for birthday parties and celebrations",
          peopleCount: "50",
          price: "10000"
        }
      ]
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    navigate('/profile');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      // Handle deletion
      navigate('/profile');
    }
  };

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menu: [...formData.menu, { name: '', price: '' }]
    });
  };

  const removeMenuItem = (index) => {
    const newMenu = [...formData.menu];
    newMenu.splice(index, 1);
    setFormData({ ...formData, menu: newMenu });
  };

  const addEventBundle = () => {
    setFormData({
      ...formData,
      eventBundles: [...formData.eventBundles, {
        name: '',
        description: '',
        peopleCount: '',
        price: ''
      }]
    });
  };

  const removeEventBundle = (index) => {
    const newBundles = [...formData.eventBundles];
    newBundles.splice(index, 1);
    setFormData({ ...formData, eventBundles: newBundles });
  };

  const addFoodType = () => {
    const type = prompt('Enter new food type:');
    if (type) {
      setFormData({
        ...formData,
        foodTypes: [...formData.foodTypes, type]
      });
    }
  };

  const removeFoodType = (index) => {
    const newTypes = [...formData.foodTypes];
    newTypes.splice(index, 1);
    setFormData({ ...formData, foodTypes: newTypes });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Listing: {formData.name}</h1>
        <button
          onClick={handleDelete}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
        >
          <FaTrash />
          <span>Delete Listing</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Business Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Food Types</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.foodTypes.map((type, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full"
              >
                <span>{type}</span>
                <button
                  type="button"
                  onClick={() => removeFoodType(index)}
                  className="text-primary hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addFoodType}
            className="flex items-center text-primary"
          >
            <FaPlus className="mr-1" /> Add Food Type
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Hours</label>
            <input
              type="text"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Menu Items</label>
          <div className="space-y-4">
            {formData.menu.map((item, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newMenu = [...formData.menu];
                    newMenu[index].name = e.target.value;
                    setFormData({ ...formData, menu: newMenu });
                  }}
                  placeholder="Item name"
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const newMenu = [...formData.menu];
                    newMenu[index].price = e.target.value;
                    setFormData({ ...formData, menu: newMenu });
                  }}
                  placeholder="Price"
                  className="w-24 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeMenuItem(index)}
                  className="text-red-500"
                >
                  <FaTimes />
                </button>
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
            {formData.eventBundles.map((bundle, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={bundle.name}
                    onChange={(e) => {
                      const newBundles = [...formData.eventBundles];
                      newBundles[index].name = e.target.value;
                      setFormData({ ...formData, eventBundles: newBundles });
                    }}
                    placeholder="Bundle name"
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeEventBundle(index)}
                    className="text-red-500 ml-2"
                  >
                    <FaTimes />
                  </button>
                </div>
                <textarea
                  value={bundle.description}
                  onChange={(e) => {
                    const newBundles = [...formData.eventBundles];
                    newBundles[index].description = e.target.value;
                    setFormData({ ...formData, eventBundles: newBundles });
                  }}
                  placeholder="Bundle description"
                  className="w-full p-2 border rounded"
                  rows="2"
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={bundle.peopleCount}
                    onChange={(e) => {
                      const newBundles = [...formData.eventBundles];
                      newBundles[index].peopleCount = e.target.value;
                      setFormData({ ...formData, eventBundles: newBundles });
                    }}
                    placeholder="Number of people"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={bundle.price}
                    onChange={(e) => {
                      const newBundles = [...formData.eventBundles];
                      newBundles[index].price = e.target.value;
                      setFormData({ ...formData, eventBundles: newBundles });
                    }}
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

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold"
          >
            Save Changes
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/profile')}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </div>
  );
}