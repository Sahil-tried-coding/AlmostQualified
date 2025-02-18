import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "../../../../../components/ui/button";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { data, useParams } from "react-router-dom";
import { LoaderCircleIcon } from "lucide-react";

function Skills() {

  const params = useParams()
  const{resumeInfo,setResumeInfo} = useContext(ResumeContext)
  const [loading, setLoading] = useState(false)
  const [skillsList, setSkillsList] = useState([{
    skillName: "",
    rating: 0
  }]);


  console.log("this is the rating 💕💕💕💕",skillsList?.rating)
  useEffect(() => {
    if (resumeInfo?.skills && Array.isArray(resumeInfo.skills) && resumeInfo.skills.length > 0) {
      setSkillsList(resumeInfo.skills);
    } else {
      setSkillsList([{
        skillName:"",
        rating:0
      }]);
      console.log("Initialized with default experience.");
    }
  }, []); // run once on mount

  // Fetch experience data from the backend on mount.
  const getUserSkill = async () => {
    try {
      const userData = await GlobalAPI.GetSkillsComponent(params?.resume_id);
      // const education = await GlobalAPI.GetResumeById(params?.resume_id);

      // console.log("this is the education from experience",education)
      // If the fetched data has an experience array, update local state.
      if (userData.data?.data?.skills && Array.isArray(userData.data.data.skills)) {
        setSkillsList(userData.data.data.skills);
      } else {
        setSkillsList([
          {
      skillName:"",
      rating:0
    }
        ]);
      }
      console.log("Fetched experience:", userData.data?.data?.skills);
    } catch (error) {
      console.error("Error fetching experience:", error);
      setSkillsList([{
        skillName:"",
        rating:0
      }]);
    }
  };

  useEffect(() => {
    getUserSkill();
  }, [params.resume_id]);

  // Handle text input changes.
  // const handleChange = (index, event) => {
  //   const newEntries = [...skillsList];
  //   const { name, value } = event.target;
  //   newEntries[index][name] = value;
  //   setSkillsList(newEntries);
  //   console.log("Updated entry at index", index, ":", newEntries[index]);
  // };




  // Update the global context whenever the local experienceList changes.
  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, skills: skillsList }));
  }, [skillsList, setResumeInfo]);

  // Save the data to the backend.
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Update global context immediately on save.
    setResumeInfo((prev) => ({ ...prev, skills: skillsList }));

    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };

    console.log("Data to be saved:", skillsList);

    try {
      const resp = await GlobalAPI.UpdateFormData(params?.resume_id, data);
      if (resp.data) {
        console.log("Response saved:", resp.data);
      }
    } catch (error) {
      console.error("Error saving experience:", error);
    }
    setLoading(false);
  };

// useEffect(()=>{
//   if(resumeInfo?.skills && Array.isArray(resumeInfo.skills) && resumeInfo?.skills.length > 0){
//     setSkillsList(resumeInfo?.skills)
//   }
//   else{
//     setSkillsList([{
//       skillName:"",
//       rating:0
//     }])
//   }
// },[])



const handleChange = (index,name,value) =>{

  const newEntries = [...skillsList]


  newEntries[index][name] = value

  setSkillsList(newEntries)

}


// const onSave = async(e) =>{
// e.preventDefault()
// setLoading(true)

// setSkillsList((prev) => ({ ...prev, skills: skillsList }));

// const data={
//   data:{
//       skills:skillsList.map(({ id, ...rest }) => rest)
//   }
// }
//   try {
//     const resp = await GlobalAPI.UpdateFormData(params?.resume_id,data)

//     if(resp?.data){
//       console.log("successfully upload skills to db")
//     }

//   } catch (error) {
//     console.log(error)
//   }
// setLoading(false)


// }



// const getUserSkills = async() =>{

//   try {
//     const userSkills = await GlobalAPI.GetSkillsComponent(params?.resumeInfo)


//   if(userSkills?.data.data?.skills){
//     setSkillsList(userSkills?.data?.data?.skills)
//   }
//   else{
//     setSkillsList([{
//       skillName: "",
//       rating: 0
//     }])
//   }
//   } catch (error) {
//     console.log(error)
//     setSkillsList([{
//       skillName: "",
//       rating: 0
//     }])
//   }
// }

// useEffect(()=>{
// getUserSkills()
// },[params?.resume_id])



// useEffect(()=>{
//   setSkillsList((prev) => ({ ...prev, skills: skillsList }));
// },[skillsList])




  const addSkill = () =>{
    setSkillsList([...skillsList,{
      skillName:'',
      rating:0
    }])
  }


  const removeSkill = () =>{
    setSkillsList(skillsList => skillsList.slice(0,-1))
  }
  return (
    <div>
      {resumeInfo?.fieldRequired?.Skills ?<div className="p-5 border-t-purple-600 rounded-lg shadow-lg border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">Skills</h1>
      {/* <p className="font-semibold text-sm">Add your Skills  Which make impact</p> */}
      <div>
      {
          skillsList?.map((item,index)=>(
          
        <div key={index} className="grid gap-3 border sm:p-3 p-1  grid-cols-2 ">
          <label>
            Skill Name
            <Input defaultValue = {item.skillName || ""} name="skillName"  onChange={(event)=>handleChange(index,"skillName",event.target.value)} className="sm:w-[50%]" type="text" />
          </label>
          <label>
            Rating
            <Rating
            value={item.rating}
            name="rating"
            onChange = {(v)=>handleChange(index,"rating",v)}
              style={{ maxWidth: 150 }}

            />
          </label>
        </div>
        
        ))
      }
      <div className="flex  mt-6 justify-between">
          <div className="gap-4 flex">
          <Button className="bg-white text-blue-600 border border-blue-700" onClick={addSkill}>Add  Skill</Button>
          <Button variant="outline" onClick={removeSkill}>Remove </Button>
          </div>
          <div>
            <Button className="bg-purple-500" onClick={onSave}>{loading? <LoaderCircleIcon className="animate-spin"/>:"Save"}</Button>
          </div>
        </div>
      </div>
    </div>:<div className="flex  items-center">
      <div className="font-semibold justify-center mt-32 items-center">You havent Selected <span className="text-purple-600">Skill's</span> Field Click Next or Go back and select <span className="text-purple-600">Skill's</span> Field</div>
      </div>}
    </div>
  );
}

export default Skills;
