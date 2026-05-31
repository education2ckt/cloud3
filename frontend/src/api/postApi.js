import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const postApi = axios.create({
    baseURL: API_URL,
});

// Request Interceptor: Log outgoing requests
postApi.interceptors.request.use(
    (config) => {
        console.log(`[API Request] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor: Log incoming responses
postApi.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
        return response;
    },
    (error) => {
        console.error(`[API Response Error] ${error.response?.status || 'Network Error'} ${error.config?.url}`, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const getAllPosts = () => postApi.get('/posts');
export const getPostById = (id) => postApi.get(`/posts/${id}`);
export const createPost = (postData) => postApi.post('/posts', postData);
export const updatePost = (id, postData) => postApi.put(`/posts/${id}`, postData);
export const deletePost = (id) => postApi.delete(`/posts/${id}`);

export default postApi;
