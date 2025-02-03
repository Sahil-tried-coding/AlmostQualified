import { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import TextEditor from "./TextEditor";
import { ResumeContext } from "../../../../../Context/ResumeContext";
// import { title } from "process";

function Experience() {
  const formDetails = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary:"",
  };

  const [experienceList, setExperienceList] = useState([formDetails]);

  const{resumeInfo,setResumeInfo} = useContext(ResumeContext)

  const handleChange = (index,event) =>{
    const newEntries = experienceList.slice();
const{name,value} = event.target;

newEntries[index][name] = value
setExperienceList(newEntries)
}

useEffect(()=>{
    setResumeInfo({...resumeInfo,
        experience:experienceList
    })

},[experienceList])

const handleTextEditor = (e,name,index)=>{
const newEntries = experienceList.slice()
newEntries[index][name]=e.target.value
setExperienceList(newEntries)

}



  const addExperience = () =>{
    setExperienceList([...experienceList,formDetails])
  }

  const removeExperience = () =>{
    setExperienceList(experienceList => experienceList.slice(0,-1))
  }


  return (
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg  border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">
        Professional Experience
      </h1>
      <p className="font-semibold text-sm">Add your previous job experience</p>

      {experienceList.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 p-3 gap-3 border my-5 ">
            <label>
              Position Title
              <Input onChange={(event)=>handleChange(index,event)} name="title" type="text" />
            </label>
            <label>
              Company Name
              <Input onChange={(event)=>handleChange(index,event)} name="companyName" type="text" />
            </label>
            <label>
              City
              <Input onChange={(event)=>handleChange(index,event)} name="city" type="text" />
            </label>
            <label>
              State
              <Input onChange={(event)=>handleChange(index,event)} name="state" type="text" />
            </label>
            <label>
              Start Date
              <Input onChange={(event)=>handleChange(index,event)} name="startDate" type="date" />
            </label>
            <label>
              End Date
              <Input onChange={(event)=>handleChange(index,event)} name="endDate" type="date" />
            </label>

            <div className="col-span-2">
              <TextEditor   onRichTextEditorChange = {e=>handleTextEditor(e,"workSummary",index)} />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="gap-5 flex">
            <Button onClick={addExperience} variant="outline" className="text-purple-600">
              + Add more Experience
            </Button>
            <Button onClick={removeExperience} variant="outline" className="text-purple-600">
              Remove
            </Button>
            </div>
            <Button>Save</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Experience;
