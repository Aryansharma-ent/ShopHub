import api from "./Client";

export const getProduct = () => api.get('/api/products');