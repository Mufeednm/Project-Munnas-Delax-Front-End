import axios from "./axios";

export const getAllbuildings = async () => {
    try {
        
    const response = await axios.get('/buildings');
    return response.data; // 👈 Extract JSON data
} catch (error) {
    console.error('Error fetching buildings:', error);
    throw error;
  }
  };
export const fetchVacantRooms = async () => {
    try {
        
    const response = await axios.get('/buildings/units/vaccunt');
    return response.data; // 👈 Extract JSON data
} catch (error) {
    console.error('Error fetching buildings:', error);
    throw error;
  }
  };


  export const getBuildingById = async (buildingId) => {
    try {
        console.log("in axios ",buildingId);
      // For GET requests, if you need to send data in the request body:
      const response = await axios.post('/buildings/details', {buildingId});
      return response.data;
    } catch (error) {
      console.error(`Error fetching building ${buildingId}:`, error);
      throw error;
    }
  };