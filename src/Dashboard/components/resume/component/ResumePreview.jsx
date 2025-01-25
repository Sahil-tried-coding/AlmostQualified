import React, { useContext } from "react";
import { ResumeContext } from "../../../../Context/ResumeContext";
import PesonalDetails from "./preview/personalDetails";
import ExperiencePreview from "./preview/ExperiencePreview";
import SummaryPreview from "./preview/SummaryPreview";
import EducationPreview from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillsPreview";
function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  console.log(resumeInfo.firstName);
  return (
    <div className="w-[43%] shadow-lg p-12 h-full border-t-[20px]" style={{ borderTopColor: resumeInfo?.themeColor }}>
      {/* <div
        className="h-[20px]"
        style={{ backgroundColor: resumeInfo?.themeColor }}
      ></div> */}
      {/* personal details */}
      <PesonalDetails resumeInfo={resumeInfo} />

      {/* summary */}

      <SummaryPreview resumeInfo={resumeInfo} />

      {/* professnial experience */}

      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* education */}

      <EducationPreview resumeInfo={resumeInfo} />

      {/* skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
