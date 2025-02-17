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



 useEffect(() => {
  if (!resumeInfo) {
    setResumeInfo(Dummy);
  }
}, []);




  
  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo,fieldSelected,setFieldSelected}}>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-3 sm:mx-8">
      <Form/>
      <ResumePreview/>
    </div>
    </ResumeContext.Provider>
  );
}

export default EditResume;
