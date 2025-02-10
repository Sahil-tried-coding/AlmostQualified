import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);
// 
// const EditResume = (user_email) => axiosClient.get('/user-resumes/')

export const GetUserResume = (user_email) => axiosClient.get('/user-resumes?fillters[userEmail][$eq]='+user_email);

export const GetResumeById = (id) => 
  axiosClient.get(`/user-resumes/${id}?populate=*`);


export const GetAllResumes = () => axiosClient.get('/user-resumes');


export const MyOneResume = (id) => axiosClient.get(`/user-resumes/${id}`)

export const GetEducationComponent = (id) => axiosClient.get(`http://localhost:1337/api/user-resumes/${id}?populate=education`)


export const GetSkillsComponent = (id) => axiosClient.get(`http://localhost:1337/api/user-resumes/${id}?populate=skills`)



export const GetExperienceComponent = (id) => axiosClient.get(`http://localhost:1337/api/user-resumes/${id}?populate=experience`)

export const UpdateFormData = (id,data) => {
//  axiosClient.put(`user-resumes/74`,data)
 return axiosClient.put(`/user-resumes/${id}`,data)
} 
export default {
  GetSkillsComponent, GetEducationComponent,GetExperienceComponent,MyOneResume,CreateNewResume,GetUserResume,UpdateFormData,GetAllResumes,GetResumeById
};

// import axios from "axios";

// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// const axiosClient = axios.create({
//   baseURL: "http://localhost:1337/api/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });

// export const CreateNewResume = (data) => axiosClient.post("/user-resumes", { data });

// export const GetUserResume = (user_email) => 
//   axiosClient.get(`/user-resumes?filters[user_email][$eq]=${user_email}`);

// export const UpdateFormData = (id, data) => {
//   console.log('Making PUT request to:', `/user-resumes/${id}`);
//   console.log('With data:', data);
//   return axiosClient.put(`/user-resumes/${id}`, data);
// };

// export default {
//   CreateNewResume,
//   GetUserResume,
//   UpdateFormData
// };
