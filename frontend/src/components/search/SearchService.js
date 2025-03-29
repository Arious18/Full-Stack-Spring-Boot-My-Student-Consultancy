
const API_BASE_URL = 'http://localhost:8080'; // Change this to your API base URL

class SearchService {
    async searchAll(query) {
        try {
            // Fetch results from all endpoints in parallel
            const [universities, faculties, fields, countries] = await Promise.all([
                this.searchUniversities(query),
                this.searchFaculties(query),
                this.searchFields(query),
                this.searchCountries(query)
            ]);

            return {
                universities,
                faculties,
                fields,
                countries
            };
        } catch (error) {
            console.error('Error in global search:', error);
            throw error;
        }
    }

    async searchUniversities(query) {
        // In a real implementation, you would have an endpoint like /universities/search?q=query
        // For now, we'll fetch all and filter client-side
        const response = await fetch(`${API_BASE_URL}/universities`);
        const data = await response.json();

        return data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
            (item.about && item.about.toLowerCase().includes(query.toLowerCase()))
        );
    }

    async searchFaculties(query) {
        const response = await fetch(`${API_BASE_URL}/faculties`);
        const data = await response.json();

        return data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
        );
    }

    async searchFields(query) {
        const response = await fetch(`${API_BASE_URL}/fields`);
        const data = await response.json();

        return data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
        );
    }

    async searchCountries(query) {
        const response = await fetch(`${API_BASE_URL}/countries`);
        const data = await response.json();

        return data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
        );
    }
}

export default new SearchService();