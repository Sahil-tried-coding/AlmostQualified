import React, { useContext } from "react";
import { ResumeContext } from "../../../../Context/ResumeContext";
import PesonalDetails from "./preview/PersonalPreview.jsx";
import ExperiencePreview from "./preview/ExperiencePreview";
import SummaryPreview from "./preview/SummaryPreview";
import EducationPreview from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillsPreview";
import { LoaderCircleIcon } from "lucide-react";
import Projectspreview from "./preview/Projectspreview.jsx";
import ShimmerLoader from "./Shimmar.jsx";
function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  // const [loading, setLoading] = useState(second)
  return (
    <div className=" shadow-2xl p-3
     sm:p-10 h-full border-t-[20px]" style={{ borderTopColor: resumeInfo?.themeColor }}>
      {
        resumeInfo?<div >
        {/* <div
          className="h-[20px]"
          style={{ backgroundColor: resumeInfo?.themeColor }}
        ></div> */}
        {/* personal details */}
        <PesonalDetails setResumeInfo={setResumeInfo} resumeInfo={resumeInfo} />
  
        {/* summary */}
  
        <SummaryPreview resumeInfo={resumeInfo} />
  
        {/* professnial experience */}
  
        <ExperiencePreview resumeInfo={resumeInfo} />


        <Projectspreview resumeInfo={resumeInfo} />
  
        {/* education */}
  
        <EducationPreview resumeInfo={resumeInfo} />
  
        {/* skills */}
        <SkillsPreview resumeInfo={resumeInfo} />
      </div>:<ShimmerLoader/>
      }
    </div>
  );
}

export default ResumePreview;
