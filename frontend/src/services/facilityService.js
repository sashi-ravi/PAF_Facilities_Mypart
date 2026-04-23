import axios from 'axios';

const API_URL = 'http://localhost:8081/api/facilities';

export const getAllFacilities = () => axios.get(API_URL);
export const getFacilityById = (id) => axios.get(`${API_URL}/${id}`);
export const createFacility = (facility) => axios.post(API_URL, facility);
export const updateFacility = (id, facility) =>
	axios.put(`${API_URL}/${id}`, facility);
export const deleteFacility = (id) => axios.delete(`${API_URL}/${id}`);

export const searchFacilities = (params) =>
	axios.get(`${API_URL}/search`, { params });
