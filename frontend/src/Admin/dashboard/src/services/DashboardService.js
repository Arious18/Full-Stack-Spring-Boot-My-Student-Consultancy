import axios from 'axios';

const API_BASE_URL = '/api/dashboard';

export const DashboardService = {
    // Get overall dashboard statistics
    getDashboardStats: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },

    // Get user growth data for line chart
    getUserGrowthData: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user-growth`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user growth data:', error);
            throw error;
        }
    },

    // Get application by faculty data for bar chart
    getApplicationByFaculty: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/application-by-faculty`);
            return response.data;
        } catch (error) {
            console.error('Error fetching application by faculty data:', error);
            throw error;
        }
    },

    // Get application by country data for geography chart
    getApplicationByCountry: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/application-by-country`);
            return response.data;
        } catch (error) {
            console.error('Error fetching application by country data:', error);
            throw error;
        }
    },

    // Get recent applications data
    getRecentApplications: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/recent-applications`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recent applications:', error);
            throw error;
        }
    }
};