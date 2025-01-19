import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);
// 
// const EditResume = (user_email) => axiosClient.get('/user-resumes/')

export const GetUserResume = (user_email) => axiosClient.get('/user-resumes/')

export default {
  CreateNewResume,
};
