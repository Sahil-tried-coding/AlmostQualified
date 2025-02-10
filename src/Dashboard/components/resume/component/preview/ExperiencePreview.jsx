import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "../../../../../../Service/GlobalAPI";

function ExperiencePreview({ resumeInfo }) {



  const params = useParams()


  useEffect(()=>{

    const getUserExperience = async () =>{
      const userData = await GlobalAPI.GetExperienceComponent(params?.resume_id)
      console.log("❌❌❌❌❌❌",userData.data.data.experience)
    }

    getUserExperience()

  },[])
  // const experience =experience
  return (
    <div className="my-3">
      <h1
        className="text-center font-bold "
        style={{ color: resumeInfo?.themeColor }}
      >
        Professinal Experience
      </h1>
      <hr
        className="border-2 my-3 border-black"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div>
         {/* eslint-disable-next-line react/prop-types */}
        {/* { resumeInfo?.experience.map((item, index) => { */}
        {resumeInfo?.experience && resumeInfo?.experience.map((item, index) => {
          return (
            <div className="my-3" key={index}>
              <h1 className="font-bold  text-sm my-1" style={{color:resumeInfo?.themeColor}} >{item.title}</h1>
              <div className="flex justify-between"><h1 className="text-xs font-semibold">{item.companyName}, {item.city}, {item.state}</h1>
              {/* <h1 className="font-semibold text-xs">{item.startDate}  to  {item.currentlyWorking ? "Present" : item.endDate} </h1></div> */}
              <h1 className="font-semibold text-xs">{item.startDate}  to  {item.present ? "Present": item.endDate }</h1></div>
              {/* <h1 className="text-xs font-semibold ">{item.workSummary}</h1> */}
              <div className="text-xs font-semibold " dangerouslySetInnerHTML={{__html:item.workSummary}} />

              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExperiencePreview;
