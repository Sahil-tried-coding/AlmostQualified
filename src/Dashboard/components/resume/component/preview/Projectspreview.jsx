import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import  { useContext } from 'react'
import { ResumeContext } from '../../../../../Context/ResumeContext';
function Projectspreview({ resumeInfo }) {
  
  const { fieldSelected, setFieldSelected } = useContext(ResumeContext);


  const params = useParams()


  // useEffect(()=>{

  //   const getUserExperience = async () =>{
  //     const userData = await GlobalAPI.GetExperienceComponent(params?.resume_id)
  //     console.log("❌❌❌❌❌❌",userData.data.data.experience)
  //   }

  //   getUserExperience()

  // },[])
  // const experience =experience
  return (
    <div>

    {
      resumeInfo?.fieldRequired?.Project && <div className="my-3">
      <h1
        className="text-center font-bold capitalize"
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
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
        {resumeInfo?.fieldRequired?.Project && resumeInfo?.projects.map((item, index) => {
          return (
            <div className="my-3" key={index}>
              <h1 className="font-bold  text-sm my-1 capitalize" style={{color:resumeInfo?.themeColor}} >{item.projectName}</h1>
              <div className="flex justify-between"><h1 className="text-xs font-semibold"><span className="font-bold">Tech Stack :-</span> {item.techStack}</h1>
              {/* <h1 className="font-semibold text-xs">{item.startDate}  to  {item.currentlyWorking ? "Present" : item.endDate} </h1></div> */}
              <h1 className="font-bold text-blue-600 text-xs"> <a href={item.liveLink}>LiveLink</a> | <a href={item.githubLink}>Github Link</a> </h1></div>
              {/* <h1 className="text-xs font-semibold ">{item.workSummary}</h1> */}
              <div className="text-xs w-[80%] font-semibold " dangerouslySetInnerHTML={{__html:item.description}} />

            </div>
          );
        })}
      </div>
    </div>
    }
        </div>
  );
}

export default Projectspreview;
