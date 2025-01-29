import React, { useEffect, useState } from "react";
// import Header from "../../../../Custom/Header";
import { useParams } from "react-router-dom";
import ResumePreview from "../../component/ResumePreview"
import Form from "../../component/Form"
import { ResumeContext } from "../../../../../Context/ResumeContext";
import Dummy from "../../../../../Data/Dummy";

function EditResume() {

 const [resumeInfo, setResumeInfo] = useState(null)



  useEffect(()=>{
     setResumeInfo(Dummy)
    // console.log(resumeInfo.firstName)
  },[])



  
  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo}}>

    <div className="flex justify-evenly">
      <Form/>
      <ResumePreview/>
    </div>
    </ResumeContext.Provider>
  );
}

export default EditResume;
