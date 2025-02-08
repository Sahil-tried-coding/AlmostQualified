import { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import TextEditor from "./TextEditor";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { BrainIcon, LoaderCircleIcon } from "lucide-react";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";
// import { title } from "process";

function Experience() {


  const params = useParams();
  const formDetails = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: "",
  };

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [experienceList, setExperienceList] = useState([formDetails]);

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (resumeInfo?.experience && Array.isArray(resumeInfo.experience) && resumeInfo.experience.length > 0) {
      setExperienceList(resumeInfo.experience);
    } else {
      // This will run for a new resume or if experience is undefined,
      // initializing the state with one default object.
      setExperienceList([formDetails]);
    }
  }, [resumeInfo]);
  
  // useEffect(() => {
  //   if (initialLoad) {
  //     if (resumeInfo?.experience?.length > 0) {
  //       setExperienceList(resumeInfo.experience);
  //     } else {
  //       setExperienceList([{
  //         title: "",
  //         companyName: "",
  //         city: "",
  //         state: "",
  //         startDate: "",
  //         endDate: "",
  //         workSummary: "",
  //       }]);
  //     }
  //     setInitialLoad(false); // Only update once.
  //   }
  //   console.log("this is the lenght ",experienceList)
  // }, [resumeInfo, initialLoad]);
  
  // useEffect(() => {
  //   // When resumeInfo changes, update experienceList safely:
  //   if (resumeInfo?.experience?.length > 0) {
  //     setExperienceList(resumeInfo.experience);
  //   } else {
  //     // For a new resume where experience is undefined, initialize with a default object.
  //     setExperienceList([formDetails]);
  //   }
  // }, []);
  
  

  useEffect(()=>{

    const getUserExperience = async () =>{
      const userData = await GlobalAPI.GetExperienceComponent(params?.resume_id)
      // const userInfo = await GlobalAPI.MyOneResume(params?.resume_id)
      
      // setResumeInfo(userInfo.data.data)
      setResumeInfo(userData.data?.data)
      setExperienceList(userData.data?.data?.experience)
      // setResumeInfo(userData.data?.data || [formDetails])
      // console.log("")
      console.log("this is the Resume Info" ,resumeInfo)


      // setResumeInfo({
      //   ...resumeInfo,
      //   experience:userData.data.data.experience
      // })
      // setResumeInfo((prevResumeInfo)=>({
      //   ...prevResumeInfo,
      //   experience:userData.data.data.experience

      // }))
      // setExperienceList(userData.data.data.experience)
      
      // console.log("❌❌❌❌❌❌",userData.data.data.experience)
    }
    
    getUserExperience()
    
    
  },[])

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
    console.log("this is the live typing",newEntries[index])
  };



  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);


    const updateResumeInfo = {
      ...resumeInfo,
      experience:experienceList
    }
    setResumeInfo(updateResumeInfo)



    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest), // ✅ Send correct format
      },
    };
      console.log(experienceList)

    try {
      const resp = await GlobalAPI.UpdateFormData(params?.resume_id, data);

      if (resp.data) {
        console.log("respones saved ✅✅✅✅✅",resp.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (resumeInfo?.experience?.length >0) {
      setExperienceList(resumeInfo.experience);
      console.log("⬇️⬇️⬇️⬇️⬇️⬇️",experienceList)
    }
  }, []);
  
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
  }, [experienceList]);

  const handleTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  const addExperience = () => {
    setExperienceList([...experienceList, {title: "",
      companyName: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      workSummary: ""}]);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };


  // console.log("this is the initial experience",resumeInfo?.experience)
  // console.log("this is the resumeInfodata",resumeInfo)
  // console.log("⬇️⬇️⬇️⬇️⬇️⬇️",experienceList)



  return (
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg  border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">
        Professional Experience
      </h1>
      <p className="font-semibold text-sm">Add your previous job experience</p>

      { experienceList.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 p-3 gap-3 border my-5 ">
            <label>
              Position Title
              <Input
              defaultValue = {item.title}
              // value={experienceList[index].title || ""}
                onChange={(event) => handleChange(index, event)}
                name="title"
                type="text"
              />
            </label>
            <label>
              Company Name
              <Input
              defaultValue = {item.companyName}

              // value={item.companyName || ""}
                onChange={(event) => handleChange(index, event)}
                name="companyName"
                type="text"
              />
            </label>
            <label>
              City
              <Input
              // value={item.city || ""}
              defaultValue = {item.city}

                onChange={(event) => handleChange(index, event)}
                name="city"
                type="text"
              />
            </label>
            <label>
              State
              <Input
              // value={item.state || ""}
              defaultValue = {item.state}

                onChange={(event) => handleChange(index, event)}
                name="state"
                type="text"
              />
            </label>
            <label>
              Start Date
              <Input
              // value={item.startDate || ""}
              defaultValue = {item.startDate}

                onChange={(event) => handleChange(index, event)}
                name="startDate"
                type="date"
              />
            </label>
            <label>
              End Date
              <Input
              // value={item.endDate || ""}
              defaultValue = {item.endDate}

                onChange={(event) => handleChange(index, event)}
                name="endDate"
                type="date"
              />
            </label>
            <div></div>

            <div className="col-span-2">
              <TextEditor
              defaultValue = {item.workSummary}

                index={index}
                onRichTextEditorChange={(e) =>
                  handleTextEditor(e, "workSummary", index)
                }
              />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="gap-5 flex">
              <Button
                onClick={addExperience}
                variant="outline"
                className="text-purple-600"
              >
                + Add more Experience
              </Button>
              <Button
                onClick={removeExperience}
                variant="outline"
                className="text-purple-600"
              >
                Remove
              </Button>
            </div>
            <Button onClick={onSave}>
              {loading ? <LoaderCircleIcon className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Experience;


// import { useContext, useEffect, useState } from "react";
// import { Button } from "../../../../../components/ui/button";
// import { Input } from "../../../../../components/ui/input";
// import TextEditor from "./TextEditor";
// import { ResumeContext } from "../../../../../Context/ResumeContext";
// import { BrainIcon, LoaderCircle, LoaderCircleIcon } from "lucide-react";
// import GlobalAPI from "../../../../../../Service/GlobalAPI";
// import { useParams } from "react-router-dom";










// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import React, { useContext, useEffect, useState } from 'react'
// // // import RichTextEditor from '../RichTextEditor'
// // import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// // import { useParams } from 'react-router-dom'
// // import TextEditor from "./TextEditor"
// // import { LoaderCircle } from 'lucide-react'
// // import { ResumeContext } from '../../../../../Context/ResumeContext'
// // import GlobalAPI from '../../../../../../Service/GlobalAPI'

// const formField={
//     title:'',
//     companyName:'',
//     city:'',
//     state:'',
//     startDate:'',
//     endDate:'',
//     workSummary:'',

// }
// function Experience() {
//     const [experinceList,setExperinceList]=useState([]);
//     const {resumeInfo,setResumeInfo}=useContext(ResumeContext);
//     const params=useParams();
//     const [loading,setLoading]=useState(false);

//     useEffect(()=>{
//         resumeInfo?.experience.length>0&&setExperinceList(resumeInfo?.experience)
        
//     },[])

//     const handleChange=(index,event)=>{
//         const newEntries=experinceList.slice();
//         const {name,value}=event.target;
//         newEntries[index][name]=value;
//         console.log(newEntries)
//         setExperinceList(newEntries);
//     }

//     const AddNewExperience=()=>{
    
//         setExperinceList([...experinceList,{
//             title:'',
//             companyName:'',
//             city:'',
//             state:'',
//             startDate:'',
//             endDate:'',
//             workSummary:'',
//         }])
//     }

//     const RemoveExperience=()=>{
//         setExperinceList(experinceList=>experinceList.slice(0,-1))
//     }

//     const handleRichTextEditor=(e,name,index)=>{
//         const newEntries=experinceList.slice();
//         newEntries[index][name]=e.target.value;
       
//         setExperinceList(newEntries);
//     }

//     useEffect(()=>{
//         setResumeInfo({
//             ...resumeInfo,
//             experience:experinceList
//         });
     
//     },[experinceList]);


//     const onSave=()=>{
//         setLoading(true)
//         const data={
//             data:{
//                 experience:experinceList.map(({ id, ...rest }) => rest)
//             }
//         }

//          console.log(experinceList)

//         GlobalAPI.UpdateFormData(params?.resume_id,data).then(res=>{
//             console.log(res);
//             setLoading(false);
//             // toast('Details updated !')
//         },(error)=>{
//           console.log(error)
//             setLoading(false);
//         })

//     }
//   return (
//     <div>
//         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//         <h2 className='font-bold text-lg'>Professional Experience</h2>
//         <p>Add Your previous Job experience</p>
//         <div>
//             {experinceList.map((item,index)=>(
//                 <div key={index}>
//                     <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
//                         <div>
//                             <label className='text-xs'>Position Title</label>
//                             <Input name="title" 
//                             onChange={(event)=>handleChange(index,event)}
//                             defaultValue={item?.title}
//                             />
//                         </div>
//                         <div>
//                             <label className='text-xs'>Company Name</label>
//                             <Input name="companyName" 
//                             onChange={(event)=>handleChange(index,event)}
//                             defaultValue={item?.companyName} />
//                         </div>
//                         <div>
//                             <label className='text-xs'>City</label>
//                             <Input name="city" 
//                             onChange={(event)=>handleChange(index,event)} 
//                             defaultValue={item?.city}/>
//                         </div>
//                         <div>
//                             <label className='text-xs'>State</label>
//                             <Input name="state" 
//                             onChange={(event)=>handleChange(index,event)}
//                             defaultValue={item?.state}
//                              />
//                         </div>
//                         <div>
//                             <label className='text-xs'>Start Date</label>
//                             <Input type="date"  
//                             name="startDate" 
//                             onChange={(event)=>handleChange(index,event)} 
//                             defaultValue={item?.startDate}/>
//                         </div>
//                         <div>
//                             <label className='text-xs'>End Date</label>
//                             <Input type="date" name="endDate" 
//                             onChange={(event)=>handleChange(index,event)} 
//                             defaultValue={item?.endDate}
//                             />
//                         </div>
//                         <div className='col-span-2'>
//                            {/* Work Summery  */}
//                            <TextEditor
//                            index={index}
//                            defaultValue={item?.workSummary}
//                            onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}  />
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//         <div className='flex justify-between'>
//             <div className='flex gap-2'>
//             <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
//             <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

//             </div>
//             <Button disabled={loading} onClick={onSave}>
//             {loading?<LoaderCircle className='animate-spin' />:'Save'}    
//             </Button>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default Experience