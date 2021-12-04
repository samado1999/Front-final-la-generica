import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9000/api/test/';

class UserService {
  getPublicContent() {

    return axios.get(API_URL + 'all', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE', 'Access-Control-Allow-Headers': 'Content-Type, Origin, Cache-Control, X-Requested-With', 'Access-Control-Allow-Credentials': 'true' } });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
