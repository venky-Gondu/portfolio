import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Contact API
export const contactAPI = {
    submit: async (data: {
        name: string;
        email: string;
        phone: string;
        message: string;
    }) => {
        const response = await api.post('/api/contact', data);
        return response.data;
    },
};

// Visitor API
export const visitorAPI = {
    track: async (data: { page?: string; referrer?: string }) => {
        const response = await api.post('/api/visitor/track', data);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/api/visitor/stats');
        return response.data;
    },
};

// Admin API
export const adminAPI = {
    login: async (email: string, password: string) => {
        const response = await api.post('/api/admin/login', { email, password });
        return response.data;
    },

    getContacts: async (limit = 100, skip = 0) => {
        const response = await api.get('/api/admin/contacts', {
            params: { limit, skip },
        });
        return response.data;
    },

    deleteContact: async (contactId: string) => {
        const response = await api.delete(`/api/admin/contacts/${contactId}`);
        return response.data;
    },

    markAsRead: async (contactId: string) => {
        const response = await api.patch(`/api/admin/contacts/${contactId}/read`);
        return response.data;
    },

    verifyToken: async () => {
        const response = await api.get('/api/admin/verify');
        return response.data;
    },
};

export default api;
