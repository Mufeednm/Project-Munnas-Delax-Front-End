import React, { useState, useEffect } from 'react';
import { Building, Plus, Search, Eye, Edit, Trash2, Users, Home, Store, Warehouse, MapPin } from 'lucide-react';
import BuildingDetails from '../../components/AdminComponents/BuildingDetails';
// import BuildingDetails from './BuildingDetails';

const Admin = () => {
  const [currentView, setCurrentView] = useState('buildings'); // 'buildings' or 'building-details'
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);

  // Mock data - replace with your API calls
  useEffect(() => {
    const mockBuildings = [
      {
        id: 1,
        name: 'Sunrise Apartments',
        address: '123 Main St, City',
        description: 'Modern residential complex with shops and parking',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        totalUnits: 45,
        occupiedUnits: 38,
        vacantUnits: 7,
        monthlyRevenue: 125000,
        yearBuilt: 2018,
        owner: 'John Smith',
        contact: '+1234567890',
        units: {
          shops: { total: 8, occupied: 7, vacant: 1 },
          familyRooms: { total: 15, occupied: 12, vacant: 3 },
          bachelorRooms: { total: 12, occupied: 10, vacant: 2 },
          godowns: { total: 5, occupied: 4, vacant: 1 },
          freeAreas: { total: 5, occupied: 5, vacant: 0 }
        }
      },
      {
        id: 2,
        name: 'Downtown Complex',
        address: '456 Oak Ave, City',
        description: 'Commercial and residential mixed-use building',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
        totalUnits: 32,
        occupiedUnits: 28,
        vacantUnits: 4,
        monthlyRevenue: 95000,
        yearBuilt: 2020,
        owner: 'Jane Doe',
        contact: '+1234567891',
        units: {
          shops: { total: 6, occupied: 6, vacant: 0 },
          familyRooms: { total: 10, occupied: 8, vacant: 2 },
          bachelorRooms: { total: 8, occupied: 7, vacant: 1 },
          godowns: { total: 4, occupied: 3, vacant: 1 },
          freeAreas: { total: 4, occupied: 4, vacant: 0 }
        }
      },
      {
        id: 3,
        name: 'Green Valley Residency',
        address: '789 Pine St, City',
        description: 'Eco-friendly residential complex with commercial spaces',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
        totalUnits: 28,
        occupiedUnits: 22,
        vacantUnits: 6,
        monthlyRevenue: 78000,
        yearBuilt: 2019,
        owner: 'Mike Wilson',
        contact: '+1234567892',
        units: {
          shops: { total: 4, occupied: 3, vacant: 1 },
          familyRooms: { total: 12, occupied: 9, vacant: 3 },
          bachelorRooms: { total: 6, occupied: 5, vacant: 1 },
          godowns: { total: 3, occupied: 2, vacant: 1 },
          freeAreas: { total: 3, occupied: 3, vacant: 0 }
        }
      }
    ];
    setBuildings(mockBuildings);
  }, []);

  const getFilteredBuildings = () => {
    return buildings.filter(building =>
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTotalStats = () => {
    return buildings.reduce((acc, building) => {
      acc.totalBuildings += 1;
      acc.totalUnits += building.totalUnits;
      acc.occupiedUnits += building.occupiedUnits;
      acc.vacantUnits += building.vacantUnits;
      acc.monthlyRevenue += building.monthlyRevenue;
      return acc;
    }, { totalBuildings: 0, totalUnits: 0, occupiedUnits: 0, vacantUnits: 0, monthlyRevenue: 0 });
  };

  const handleViewBuilding = (building) => {
    setSelectedBuilding(building);
    setCurrentView('building-details');
  };

  const handleBackToBuildings = () => {
    setCurrentView('buildings');
    setSelectedBuilding(null);
  };

  const stats = getTotalStats();
  const occupancyRate = stats.totalUnits > 0 ? (stats.occupiedUnits / stats.totalUnits * 100).toFixed(1) : 0;

  // If viewing building details, render the BuildingDetails component
  if (currentView === 'building-details' && selectedBuilding) {
    return <BuildingDetails building={selectedBuilding} onBack={handleBackToBuildings} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Property Management System</h1>
            </div>
            <button
              onClick={() => setShowAddBuildingModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Building</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Buildings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBuildings}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUnits}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
                <p className="text-sm text-gray-500">{stats.occupiedUnits}/{stats.totalUnits} occupied</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 text-yellow-600 flex items-center justify-center text-lg font-bold">₹</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search buildings by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {getFilteredBuildings().map(building => (
            <div key={building.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Building Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={building.image}
                  alt={building.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Building Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{building.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {building.yearBuilt}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <p className="text-sm">{building.address}</p>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{building.description}</p>
                
                {/* Unit Types Summary */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center text-sm">
                    <Store className="h-4 w-4 text-blue-500 mr-2" />
                    <span>Shops: {building.units.shops.occupied}/{building.units.shops.total}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Home className="h-4 w-4 text-green-500 mr-2" />
                    <span>Family: {building.units.familyRooms.occupied}/{building.units.familyRooms.total}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Bachelor: {building.units.bachelorRooms.occupied}/{building.units.bachelorRooms.total}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Warehouse className="h-4 w-4 text-orange-500 mr-2" />
                    <span>Godowns: {building.units.godowns.occupied}/{building.units.godowns.total}</span>
                  </div>
                </div>
                
                {/* Occupancy and Revenue */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Occupancy</span>
                    <span className="text-sm font-semibold">
                      {building.occupiedUnits}/{building.totalUnits} units
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(building.occupiedUnits / building.totalUnits) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                    <span className="text-lg font-bold text-green-600">₹{building.monthlyRevenue.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewBuilding(building)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {getFilteredBuildings().length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No buildings found</h3>
            <p className="text-gray-500">Try adjusting your search terms or add a new building.</p>
          </div>
        )}
      </div>

      {/* Add Building Modal (placeholder) */}
      {showAddBuildingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Building</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Building Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner Contact</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowAddBuildingModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddBuildingModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Building
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;