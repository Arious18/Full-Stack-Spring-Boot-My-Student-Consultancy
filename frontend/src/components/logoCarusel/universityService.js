// universityService.js
const API_BASE_URL = 'https://backend-tm-talyp-deneme2.onrender.com';

export const fetchUniversities = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/universities`);
        if (!response.ok) {
            throw new Error(`Failed to fetch universities: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching universities:', error);
        return [];
    }
};