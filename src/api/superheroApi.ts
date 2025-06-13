import axios from 'axios';
import { API_URL } from '../constants/token';

export const searchHeroesByName = async (name, offset = 0, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/search/${name}`);
        if (response.data.response === 'success') {
            const results = response.data.results || [];
            return results.slice(offset, offset + limit);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch heroes:', error);
        return [];
    }
};

export const getHeroById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.data.response === 'success') {
            return response.data;
        } else {
            console.warn(`Hero with ID ${id} not found`);
            return null;
        }
    } catch (error) {
        console.error(`Failed to fetch hero by ID ${id}:`, error);
        return null;
    }
};
