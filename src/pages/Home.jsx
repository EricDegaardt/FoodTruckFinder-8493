import { useState, useMemo } from 'react';
import TruckCard from '../components/TruckCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);

  // Mock data - replace with actual API calls
  const trucks = [
    {
      id: 1,
      name: "Taco Express",
      logo: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=500",
      photos: [
        "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000",
        "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1000",
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1000"
      ],
      description: "Authentic Mexican street tacos made with fresh ingredients and traditional recipes.",
      location: "Downtown",
      foodTypes: ["Mexican", "Tacos", "Street Food"],
      menu: [
        { name: "Carne Asada Taco", price: 3.99 },
        { name: "Chicken Taco", price: 3.49 },
        { name: "Mexican Rice", price: 2.99 }
      ]
    },
    {
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
      foodTypes: ["Italian", "Pizza", "Street Food"],
      menu: [
        { name: "Margherita Pizza", price: 12.99 },
        { name: "Pepperoni Pizza", price: 14.99 },
        { name: "Italian Salad", price: 6.99 }
      ]
    },
    {
      id: 3,
      name: "Sushi Roll",
      logo: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
      photos: [
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1000",
        "https://images.unsplash.com/photo-1611143669185-9f214cf80dcc?w=1000",
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1000"
      ],
      description: "Fresh sushi and Japanese cuisine made right in front of you.",
      location: "Midtown",
      foodTypes: ["Japanese", "Sushi", "Asian"],
      menu: [
        { name: "California Roll", price: 8.99 },
        { name: "Salmon Nigiri", price: 6.99 },
        { name: "Miso Soup", price: 3.99 }
      ]
    }
  ];

  // Extract unique food types from all trucks
  const availableFoodTypes = useMemo(() => {
    const types = new Set();
    trucks.forEach(truck => {
      truck.foodTypes.forEach(type => types.add(type));
      truck.menu.forEach(item => {
        const words = item.name.split(' ');
        words.forEach(word => {
          if (word.length > 3) types.add(word);
        });
      });
    });
    return Array.from(types).sort();
  }, []);

  // Filter trucks based on search query and selected food types
  const filteredTrucks = useMemo(() => {
    return trucks.filter(truck => {
      const matchesSearch = 
        truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFoodTypes = 
        selectedFoodTypes.length === 0 ||
        selectedFoodTypes.some(type => 
          truck.foodTypes.includes(type) ||
          truck.menu.some(item => 
            item.name.toLowerCase().includes(type.toLowerCase())
          )
        );

      return matchesSearch && matchesFoodTypes;
    });
  }, [searchQuery, selectedFoodTypes]);

  const toggleFoodType = (type) => {
    setSelectedFoodTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-4">
          Find Food Trucks Near You
        </h1>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, cuisine, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaFilter className="text-primary" />
              <span className="font-semibold">Filter by Food Type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableFoodTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFoodType(type)}
                  className={`px-3 py-1 rounded-full border transition-colors ${
                    selectedFoodTypes.includes(type)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrucks.map(truck => (
          <TruckCard key={truck.id} truck={truck} />
        ))}
      </div>
    </div>
  );
}