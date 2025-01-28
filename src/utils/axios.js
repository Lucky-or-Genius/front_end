import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});

// Get account ID from local storage or use demo account
const getAccountId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accountId || '003d45e5-b3a2-40c0-8e76-59ef89f6a519';
  } catch {
    return '003d45e5-b3a2-40c0-8e76-59ef89f6a519';
  }
};

// Request interceptor to add accountId
Axios.interceptors.request.use((config) => {
  // Only add accountId for GET requests
  if (config.method === 'get') {
    // Create or update params object
    const params = new URLSearchParams(config.params);
    
    // Only add accountId if not already present
    if (!params.has('accountId')) {
      params.append('accountId', getAccountId());
    }
    
    config.params = params;
  }
  
  // Log the full URL being requested (for debugging)
  console.log('Making request to:', `${config.baseURL}${config.url}`, 'with params:', config.params);
  
  return config;
});

export default Axios;
