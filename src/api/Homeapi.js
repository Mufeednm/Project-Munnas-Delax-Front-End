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