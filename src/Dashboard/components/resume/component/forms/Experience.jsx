import { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import TextEditor from "./TextEditor";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { BrainIcon, LoaderCircleIcon } from "lucide-react";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";

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

  // const [initialLoad, setInitialLoad] = useState(true);

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

  // useEffect(() => {
  //   if (resumeInfo?.experience?.length >0) {
  //     setExperienceList(resumeInfo.experience);
  //     console.log("⬇️⬇️⬇️⬇️⬇️⬇️",experienceList)
  //   }
  // }, []);
  
  // useEffect(() => {
  //   setResumeInfo({ ...resumeInfo, experience: experienceList });
  // }, [experienceList]);

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


