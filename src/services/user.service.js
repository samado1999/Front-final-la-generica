import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://201.244.154.157:9000/api/test/';

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

  getAdminCliente() {
    return axios.get(API_URL + 'admin-cliente', { headers: authHeader() });
  }

  getAdminClienteCreate(cliente) {
    return axios.post(API_URL + 'clientes/save', cliente, { headers: authHeader() })
  }

  getAdminClienteUpdate(cliente) {
    return axios.put(API_URL + 'clientes/update', cliente, { headers: authHeader() })
  }

  getAdminClienteConsultar(cliente) {
    return axios.get(API_URL + 'buscar/' + cliente, { headers: authHeader() })
  }

  getAdminProducto(list) {
    return axios.post(API_URL + 'admin-producto', list, { headers: authHeader() })
  }

  getAdminReporte() {
    return axios.get(API_URL + 'admin-reporte', { headers: authHeader() });
  }

  getAdminConsolidado() {
    return axios.get(API_URL + 'admin-consolidado', { headers: authHeader() });
  }

  getAdminVenta() {
    return axios.get(API_URL + 'admin-venta', { headers: authHeader() });
  }
}

export default new UserService();
