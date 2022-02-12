import axios from 'axios'
import { DataManager } from '../support/DataManager';
import constant from '../../theme/Constant'
var APIKit = axios.create({
    baseURL: constant.baseUrl,//need to change the base url in constant file
    timeout: 60000,
    
  });
  APIKit.interceptors.request.use(async (config) => {
    const tokenData = await DataManager.getAccessToken();
    if (tokenData != null) {
        const token = JSON.parse(tokenData)
        config.headers.Authorization = `Bearer ${token}`
        // config.headers['Authorization'] = `${'Bearer '+token}`
    }
    return config;
});
export default APIKit;