import axios from "axios";

const axiosPublic = axios.create({
     baseURL: 'http://localhost:7000'
 })
 
const AxiosCommon = () => {
     return axiosPublic
};

export default AxiosCommon;