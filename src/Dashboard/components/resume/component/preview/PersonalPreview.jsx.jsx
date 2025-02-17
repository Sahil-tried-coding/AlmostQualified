import { CircleDashed, StarIcon } from "lucide-react";
import React, { useEffect } from "react";

function personalDetails({ resumeInfo,setResumeInfo }) {
  // console.log("this is the fistname", resumeInfo?.firstName)

  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem("resumeData"));
  //   if (savedData) {
  //     setResumeInfo(savedData);
  //   }
  // }, []);
  return (
    <div className="">
      {/* <div className="flex flex-col gap-3"> */}

      <h1
        className="text-2xl  font-semibold text-center capitalize"
        style={{
          color: resumeInfo.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      <h2 className="text-center text-sm my-2 font-bold capitalize">{resumeInfo?.jobTitle}</h2>
      
      <div
        className="hidden sm:flex text-sm  sm:justify-evenly mt-1 font-semibold"
        style={{
          color: resumeInfo.themeColor,
        }}
      >
        <h2 className="">{resumeInfo?.phone}</h2>⋄ 
        <h2
        className="  capitalize font-semibold "
        style={{
          color: resumeInfo.themeColor,
        }}
      >
        {resumeInfo?.address} 
      </h2> ⋄
        <h2 className="">{resumeInfo?.email}  </h2> ⋄
        <h2 className=""> <a href={resumeInfo?.linkdin}>Linkedin</a></h2>
      </div>
      <div className="flex sm:hidden justify-center gap-3">
      <h2 className="">{resumeInfo?.phone}</h2> | 
      <h2
        className="  capitalize font-semibold "
      >
        {resumeInfo?.address} </h2>
      </div>
      <div className="flex justify-center gap-3">
      <h2 className="">{resumeInfo?.email}  </h2>  | 
      <h2 className="text-blue-600"> <a href={resumeInfo?.linkdin}>Linkedin</a></h2>
      </div>

      <hr
        className="border-2 my-3 border-black"
        style={{
          borderColor: resumeInfo.themeColor,
        }}
        />
        </div>
    // </div>
  );
}

export default personalDetails;
