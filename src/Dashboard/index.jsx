import React, { useEffect, useState } from "react";
// import Header from "../Custom/Header";
import Add_Resume from "./components/Add_Resume";
import { useUser } from "@clerk/clerk-react";
import GlobalAPI from "../../Service/GlobalAPI";
import Resume_items from "./components/Resume_items";

function Dashboard() {

  const [resumeList, setResumeList] = useState([])


  const {user} = useUser()

  const GetResumeList = () =>{
  try {
      GlobalAPI.GetUserResume(user?.primaryEmailAddress?.emailAddress).then(resp=>{
        setResumeList(resp.data.data)
            })
    
  } catch (error) {
    console.log(error)
  }
}

  useEffect(()=>{
    user&&GetResumeList()
    
  },[user])


  return (
    <div>
      {/* <Header /> */}
      <div className="p-6 md:p-8 lg:px-14">
      <h1 className=" text-blue-600 sm:border-none font-bold sm:text-4xl text-center text-2xl mb-3 p-2 border-2 border-black">
            Almost Qualified ! 
          </h1>
        {/* <h1 className="mb-4 text-xl font-bold ">Almost Qualified fr</h1> */}
        {/* <h3 className="mb-4 font-semibold">The Ultimate Resume Generator With Ai</h3> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <Add_Resume/>
        {
          resumeList.length>0 && resumeList.map((resume,index)=>{
            return <Resume_items  resume={resume} key={index}/>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
