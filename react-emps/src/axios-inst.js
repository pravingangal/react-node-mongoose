import axios from 'axios';

const axiosInst = axios.create({
    baseURL: 'http://localhost:4000/',    
});

export default axiosInst;
