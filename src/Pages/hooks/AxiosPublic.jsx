import axios from "axios";




const axiospublic = axios.create({
 baseURL: 'http://localhost:5000'
});

const AxiosPublic = () => {
  return axiospublic;
};

export default AxiosPublic;
