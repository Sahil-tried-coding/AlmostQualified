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

 const params = useParams();
  useEffect(()=>{

     GlobalAPI.GetExperienceComponent(params?.resume_id).then((resp)=>{
      // (resp.data)
      setResumeInfo(resp?.data?.data)
 
    })

  },[])

 useEffect(() => {
  if (!resumeInfo) {
    setResumeInfo(Dummy);
  }
}, []);




  
  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo}}>

    <div className="flex justify-evenly ">
      <Form/>
      <ResumePreview/>
    </div>
    </ResumeContext.Provider>
  );
}

export default EditResume;
