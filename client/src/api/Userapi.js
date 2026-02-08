import api from './Client.js'

export const register = (data) => api.post('/api/users/register',data)
export const login = (data) => api.post('/api/users/login', data)
