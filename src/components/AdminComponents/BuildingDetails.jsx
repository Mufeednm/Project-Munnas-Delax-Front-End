import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Building, Store, Home, Users, Warehouse, MapPin, Plus, 
  Eye, Edit, Trash2, Phone, Mail, Calendar, DollarSign, Clock,
  User, FileText, History, Camera, AlertCircle
} from 'lucide-react';

const BuildingDetails = ({ building, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUnitType, setSelectedUnitType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [units, setUnits] = useState([]);

  // Mock detailed unit data - replace with API call
  useEffect(() => {
    const mockUnits = [
      // Shops
      {
        id: 1,
        type: 'shop',
        number: 'S-01',
        floor: 'Ground',
        area: '400 sq ft',
        rent: 8000,
        deposit: 16000,
        status: 'occupied',
        tenant: {
          name: 'Raj Electronics',
          contact: '+91 9876543210',
          email: 'raj@electronics.com',
          businessType: 'Electronics Store',
          joinDate: '2023-01-15',
          leaseEnd: '2024-12-31',
          rentDue: null
        },
        history: [
          { tenant: 'Raj Electronics', period: '2023-01-15 to Present', totalPaid: 96000 },
          { tenant: 'Mobile Hub', period: '2021-06-01 to 2022-12-31', totalPaid: 144000 }
        ]
      },
      {
        id: 2,
        type: 'shop',
        number: 'S-02',
        floor: 'Ground',
        area: '350 sq ft',
        rent: 7500,
        deposit: 15000,
        status: 'vacant',
        tenant: null,
        history: [
          { tenant: 'Cafe Corner', period: '2022-03-01 to 2023-11-30', totalPaid: 135000 }
        ]
      },
      
      // Family Rooms (2BHK)
      {
        id: 3,
        type: 'family',
        number: 'F-101',
        floor: '1st Floor',
        area: '800 sq ft',
        rent: 12000,
        deposit: 24000,
        status: 'occupied',
        tenant: {
          name: 'Sharma Family',
          contact: '+91 9876543211',
          email: 'sharma@gmail.com',
          members: 4,
          joinDate: '2023-03-01',
          leaseEnd: '2024-02-29',
          rentDue: null
        },
        history: [
          { tenant: 'Sharma Family', period: '2023-03-01 to Present', totalPaid: 132000 }
        ]
      },
      {
        id: 4,
        type: 'family',
        number: 'F-102',
        floor: '1st Floor',
        area: '850 sq ft',
        rent: 13000,
        deposit: 26000,
        status: 'vacant',
        tenant: null,
        history: [
          { tenant: 'Patel Family', period: '2022-01-01 to 2023-10-31', totalPaid: 286000 }
        ]
      },
      
      // Bachelor Rooms (1BHK)
      {
        id: 5,
        type: 'bachelor',
        number: 'B-201',
        floor: '2nd Floor',
        area: '450 sq ft',
        rent: 8500,
        deposit: 17000,
        status: 'occupied',
        tenant: {
          name: 'Amit Kumar',
          contact: '+91 9876543212',
          email: 'amit@techcorp.com',
          profession: 'Software Engineer',
          joinDate: '2023-06-15',
          leaseEnd: '2024-06-14',
          rentDue: null
        },
        history: [
          { tenant: 'Amit Kumar', period: '2023-06-15 to Present', totalPaid: 68000 }
        ]
      },
      
      // Godowns
      {
        id: 6,
        type: 'godown',
        number: 'G-01',
        floor: 'Ground',
        area: '1200 sq ft',
        rent: 15000,
        deposit: 30000,
        status: 'occupied',
        tenant: {
          name: 'ABC Logistics',
          contact: '+91 9876543213',
          email: 'info@abclogistics.com',
          businessType: 'Warehouse & Storage',
          joinDate: '2023-02-01',
          leaseEnd: '2025-01-31',
          rentDue: null
        },
        history: [
          { tenant: 'ABC Logistics', period: '2023-02-01 to Present', totalPaid: 165000 }
        ]
      },
      
      // Free Areas
      {
        id: 7,
        type: 'freeArea',
        number: 'P-01',
        floor: 'Ground',
        area: '200 sq ft',
        rent: 2000,
        deposit: 4000,
        status: 'occupied',
        tenant: {
          name: 'Vehicle Parking - Sharma',
          contact: '+91 9876543211',
          email: 'sharma@gmail.com',
          joinDate: '2023-03-01',
          leaseEnd: '2024-02-29',
          rentDue: null
        },
        history: [
          { tenant: 'Vehicle Parking - Sharma', period: '2023-03-01 to Present', totalPaid: 22000 }
        ]
      }
    ];
    setUnits(mockUnits);
  }, [building.id]);

  const getUnitTypeIcon = (type) => {
    switch (type) {
      case 'shop': return <Store className="h-4 w-4" />;
      case 'family': return <Home className="h-4 w-4" />;
      case 'bachelor': return <Users className="h-4 w-4" />;
      case 'godown': return <Warehouse className="h-4 w-4" />;
      case 'freeArea': return <MapPin className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const getUnitTypeName = (type) => {
    switch (type) {
      case 'shop': return 'Shop';
      case 'family': return 'Family Room (2BHK)';
      case 'bachelor': return 'Bachelor Room (1BHK)';
      case 'godown': return 'Godown';
      case 'freeArea': return 'Free Area/Parking';
      default: return 'Unit';
    }
  };

  const getFilteredUnits = () => {
    let filtered = units;
    
    if (selectedUnitType !== 'all') {
      filtered = filtered.filter(unit => unit.type === selectedUnitType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(unit => 
        unit.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (unit.tenant && unit.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const getUnitStats = () => {
    const stats = {
      total: units.length,
      occupied: units.filter(u => u.status === 'occupied').length,
      vacant: units.filter(u => u.status === 'vacant').length,
      totalRent: units.filter(u => u.status === 'occupied').reduce((sum, u) => sum + u.rent, 0)
    };
    return stats;
  };

  const handleViewUnit = (unit) => {
    setSelectedUnit(unit);
    setShowTenantModal(true);
  };

  const stats = getUnitStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{building.name}</h1>
                <p className="text-sm text-gray-500">{building.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddUnitModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Unit</span>
              </button>
              <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Camera className="h-4 w-4 mr-2" />
                <span>Upload Images</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Building Info Card */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={building.image}
                alt={building.name}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{building.name}</h2>
                  <p className="text-gray-600 mb-2">{building.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{building.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Built in {building.yearBuilt}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{building.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                </div>
              </div>
              
              {/* Unit Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Store className="h-5 w-5 text-blue-500 mr-1" />
                    <span className="font-semibold text-gray-900">{building.units.shops.occupied}/{building.units.shops.total}</span>
                  </div>
                  <p className="text-xs text-gray-500">Shops</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Home className="h-5 w-5 text-green-500 mr-1" />
                    <span className="font-semibold text-gray-900">{building.units.familyRooms.occupied}/{building.units.familyRooms.total}</span>
                  </div>
                  <p className="text-xs text-gray-500">Family Rooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-5 w-5 text-purple-500 mr-1" />
                    <span className="font-semibold text-gray-900">{building.units.bachelorRooms.occupied}/{building.units.bachelorRooms.total}</span>
                  </div>
                  <p className="text-xs text-gray-500">Bachelor Rooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Warehouse className="h-5 w-5 text-orange-500 mr-1" />
                    <span className="font-semibold text-gray-900">{building.units.godowns.occupied}/{building.units.godowns.total}</span>
                  </div>
                  <p className="text-xs text-gray-500">Godowns</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MapPin className="h-5 w-5 text-indigo-500 mr-1" />
                    <span className="font-semibold text-gray-900">{building.units.freeAreas.occupied}/{building.units.freeAreas.total}</span>
                  </div>
                  <p className="text-xs text-gray-500">Free Areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Occupied</p>
                <p className="text-2xl font-bold text-gray-900">{stats.occupied}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vacant</p>
                <p className="text-2xl font-bold text-gray-900">{stats.vacant}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRent.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'All Units' },
                { id: 'vacant', label: 'Vacant Units' },
                { id: 'occupied', label: 'Occupied Units' },
                { id: 'history', label: 'Rent History' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search units or tenants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <select
                value={selectedUnitType}
                onChange={(e) => setSelectedUnitType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Unit Types</option>
                <option value="shop">Shops</option>
                <option value="family">Family Rooms (2BHK)</option>
                <option value="bachelor">Bachelor Rooms (1BHK)</option>
                <option value="godown">Godowns</option>
                <option value="freeArea">Free Areas/Parking</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {(activeTab === 'overview' || activeTab === 'vacant' || activeTab === 'occupied') && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {activeTab === 'overview' && `All Units (${getFilteredUnits().length})`}
                {activeTab === 'vacant' && `Vacant Units (${getFilteredUnits().filter(u => u.status === 'vacant').length})`}
                {activeTab === 'occupied' && `Occupied Units (${getFilteredUnits().filter(u => u.status === 'occupied').length})`}
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant/Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredUnits()
                    .filter(unit => {
                      if (activeTab === 'vacant') return unit.status === 'vacant';
                      if (activeTab === 'occupied') return unit.status === 'occupied';
                      return true;
                    })
                    .map(unit => (
                    <tr key={unit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getUnitTypeIcon(unit.type)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{unit.number}</div>
                            <div className="text-sm text-gray-500">{unit.floor} • {unit.area}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          unit.type === 'shop' ? 'bg-blue-100 text-blue-800' :
                          unit.type === 'family' ? 'bg-green-100 text-green-800' :
                          unit.type === 'bachelor' ? 'bg-purple-100 text-purple-800' :
                          unit.type === 'godown' ? 'bg-orange-100 text-orange-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}>
                          {getUnitTypeName(unit.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {unit.status === 'occupied' ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{unit.tenant.name}</div>
                            <div className="text-sm text-gray-500">
                              {unit.tenant.businessType || unit.tenant.profession || `${unit.tenant.members} members`}
                            </div>
                          </div>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                            Vacant
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {unit.tenant ? (
                          <div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              <span>{unit.tenant.contact}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Mail className="h-3 w-3 mr-1" />
                              <span className="truncate">{unit.tenant.email}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{unit.rent.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Deposit: ₹{unit.deposit.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {unit.tenant ? (
                          <div>
                            <div>Joined: {unit.tenant.joinDate}</div>
                            <div>Ends: {unit.tenant.leaseEnd}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewUnit(unit)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          {unit.status === 'vacant' && (
                            <button className="text-purple-600 hover:text-purple-900">
                              <Plus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Rent Payment History</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {units.map(unit => (
                  <div key={unit.id} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {unit.number} - {getUnitTypeName(unit.type)}
                    </h4>
                    <div className="space-y-2">
                      {unit.history.map((record, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{record.tenant}</p>
                              <p className="text-sm text-gray-500">{record.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-600">₹{record.totalPaid.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">Total Paid</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Unit Detail Modal */}
      {showTenantModal && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Unit {selectedUnit.number} - {getUnitTypeName(selectedUnit.type)}
                </h3>
                <button
                  onClick={() => setShowTenantModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unit Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Unit Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Floor:</span>
                      <span className="font-medium">{selectedUnit.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Area:</span>
                      <span className="font-medium">{selectedUnit.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly Rent:</span>
                      <span className="font-medium">₹{selectedUnit.rent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Security Deposit:</span>
                      <span className="font-medium">₹{selectedUnit.deposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedUnit.status === 'occupied' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUnit.status === 'occupied' ? 'Occupied' : 'Vacant'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tenant Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    {selectedUnit.status === 'occupied' ? 'Current Tenant' : 'No Current Tenant'}
                  </h4>
                  {selectedUnit.tenant ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name:</span>
                        <span className="font-medium">{selectedUnit.tenant.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contact:</span>
                        <span className="font-medium">{selectedUnit.tenant.contact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium">{selectedUnit.tenant.email}</span>
                      </div>
                      {selectedUnit.tenant.businessType && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Business:</span>
                          <span className="font-medium">{selectedUnit.tenant.businessType}</span>
                        </div>
                      )}
                      {selectedUnit.tenant.profession && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Profession:</span>
                          <span className="font-medium">{selectedUnit.tenant.profession}</span>
                        </div>
                      )}
                      {selectedUnit.tenant.members && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Family Members:</span>
                          <span className="font-medium">{selectedUnit.tenant.members}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Join Date:</span>
                        <span className="font-medium">{selectedUnit.tenant.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lease End:</span>
                        <span className="font-medium">{selectedUnit.tenant.leaseEnd}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">This unit is currently vacant and available for rent.</p>
                  )}
                </div>
              </div>

              {/* History Section */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Rental History</h4>
                <div className="space-y-3">
                  {selectedUnit.history.map((record, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{record.tenant}</p>
                          <p className="text-sm text-gray-500">{record.period}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">₹{record.totalPaid.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Total Rent Paid</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-3">
                {selectedUnit.status === 'vacant' ? (
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Add Tenant
                  </button>
                ) : (
                  <>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Tenant
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      End Lease
                    </button>
                  </>
                )}
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Unit Modal */}
      {showAddUnitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Unit</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="shop">Shop</option>
                    <option value="family">Family Room (2BHK)</option>
                    <option value="bachelor">Bachelor Room (1BHK)</option>
                    <option value="godown">Godown</option>
                    <option value="freeArea">Free Area/Parking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (₹)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit (₹)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddUnitModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddUnitModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Unit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingDetails;