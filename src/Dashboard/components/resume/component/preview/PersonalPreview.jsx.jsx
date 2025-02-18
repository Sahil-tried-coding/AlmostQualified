import { CircleDashed, StarIcon } from "lucide-react";
import React, { useEffect } from "react";
import ShimmerLoader from "../Shimmar";
import ShimmarTwo from "../ShimmarTwo";

function personalDetails({ resumeInfo,setResumeInfo }) {
  return (
    <div className="">
      {
        resumeInfo.firstName ? <div>
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
        // style={{
        //   color: resumeInfo.themeColor,
        // }}
      >
        <h2 className="">{resumeInfo?.phone}</h2>⋄ 
        <h2
        className="  capitalize font-semibold "
        // style={{
        //   color: resumeInfo.themeColor,
        // }}
      >
        {resumeInfo?.address} 
      </h2> ⋄
        <h2 className="">{resumeInfo?.email}  </h2> ⋄
        <h2 className="text-blue-600"> <a href={resumeInfo?.linkdin}>Linkedin</a></h2>
      </div>
      <div className="flex sm:hidden justify-center gap-3">
      <h2 className="">{resumeInfo?.phone}</h2> | 
      <h2
        className="  capitalize font-semibold "
      >
        {resumeInfo?.address} </h2>
      </div>
      <div className="flex sm:hidden justify-center gap-3">
      <h2 className="">{resumeInfo?.email}  </h2>  | 
      <h2 className="text-blue-600"> <a href={resumeInfo?.linkdin}>Linkedin</a></h2>
      </div>

      <hr
        className="border-2 my-3 border-black"
        style={{
          borderColor: resumeInfo.themeColor,
        }}
        />
        </div>:<ShimmarTwo/>
      }

      
        </div>
  );
}

export default personalDetails;
