import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

const userService = {

  getAllUsers: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },


  createUser: async (userName) => {
    try {
      const response = await axios.post(API_BASE_URL, { name: userName });
      return response.data; 
    } catch (error) {
      throw error;
    }
  }
};

export default userService;