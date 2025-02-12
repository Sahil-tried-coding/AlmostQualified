import React, { useEffect, useState } from "react";
// import Header from "../../../../Custom/Header";
import { useParams } from "react-router-dom";
import ResumePreview from "../../component/ResumePreview"
import Form from "../../component/Form"
import { ResumeContext } from "../../../../../Context/ResumeContext";
import Dummy from "../../../../../Data/Dummy";
import GlobalAPI from "../../../../../../Service/GlobalAPI";

function EditResume() {

 const [resumeInfo, setResumeInfo] = useState()
 const [fieldSelected , setFieldSelected] = useState({
  Experience:false,
  Project:false,
  Skills:false,
  Education:false
 })

 const params = useParams();
  useEffect(()=>{

    //  GlobalAPI.GetEducationComponent(params?.resume_id).then((resp)=>{
     GlobalAPI.GetResumeById(params?.resume_id).then((resp)=>{
      
      setResumeInfo(resp?.data?.data)
 
    })

  },[])




  useEffect(()=>{


    GlobalAPI.GetFieldRequired(params?.resume_id).then((resp)=>{
      setFieldSelected(resp?.data?.data)
      console.log("this is from the backend",fieldSelected)
    })



  },[])

 useEffect(() => {
  if (!resumeInfo) {
    setResumeInfo(Dummy);
  }
}, []);




  
  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo,fieldSelected,setFieldSelected}}>

    <div className="flex justify-evenly ">
      <Form/>
      <ResumePreview/>
    </div>
    </ResumeContext.Provider>
  );
}

export default EditResume;
