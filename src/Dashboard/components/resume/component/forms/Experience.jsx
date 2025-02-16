import { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import TextEditor from "./TextEditor";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { LoaderCircleIcon } from "lucide-react";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";

function Experience() {
  const params = useParams();

  // Default object for a new experience entry.
  const formDetails = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: "",
    present: false,
  };

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [experienceList, setExperienceList] = useState([formDetails]);
  const [addExpi, setAddExpi] = useState(true);

  // On component mount, initialize the local state from resumeInfo or default
  useEffect(() => {
    if (resumeInfo?.experience && Array.isArray(resumeInfo.experience) && resumeInfo.experience.length > 0) {
      setExperienceList(resumeInfo.experience);
    } else {
      setExperienceList([formDetails]);
      console.log("Initialized with default experience.");
    }
  }, []); // run once on mount


//   useEffect(()=>{
// if(experienceList.present){
//   setExperienceList()
// }
//   },[resumeInfo])
  // Fetch experience data from the backend on mount.
  const getUserExperience = async () => {
    try {
      const userData = await GlobalAPI.GetExperienceComponent(params?.resume_id);
      // const education = await GlobalAPI.GetResumeById(params?.resume_id);

      // console.log("this is the education from experience",education)
      // If the fetched data has an experience array, update local state.
      if (userData.data?.data?.experience && Array.isArray(userData.data.data.experience)) {
        setExperienceList(userData.data.data.experience);
      } else {
        setExperienceList([formDetails]);
      }
      console.log("Fetched experience:", userData.data?.data?.experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
      setExperienceList([formDetails]);
    }
  };

  useEffect(() => {
    getUserExperience();
  }, [params.resume_id]);

  // Handle text input changes.
  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
    console.log("Updated entry at index", index, ":", newEntries[index]);
  };

  // Handle checkbox changes for "present"
  const handleCheckboxChange = (index, event) => {
    const newEntries = [...experienceList];
    const isChecked = event.target.checked;
    
    newEntries[index].present = isChecked;
    
    // If "Present" is checked, set a random end date
    if (isChecked) {
      const randomEndDate = generateRandomFutureDate();
      newEntries[index].endDate = randomEndDate;
    } else {
      newEntries[index].endDate = ""; // Reset if unchecked
    }
  
    setExperienceList(newEntries);
  };
  
  // Function to generate a random future date
  const generateRandomFutureDate = () => {
    const year = new Date().getFullYear() + Math.floor(Math.random() * 3) + 1; // Next 1-3 years
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0"); // 01-12
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0"); // 01-28 (safe for all months)
    return `${year}-${month}-${day}`;
  };
  

  // Handle changes from the TextEditor.
  const handleTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
    console.log("Updated workSummary at index", index, ":", newEntries[index].workSummary);
  };

  // Append a new experience entry.
  const addExperience = () => {
    setAddExpi(false);
    setExperienceList([...experienceList, { ...formDetails }]);
  };

  // Remove the last experience entry.
  const removeExperience = () => {
    setExperienceList((prev) => prev.slice(0, -1));
  };

  // Update the global context whenever the local experienceList changes.
  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, experience: experienceList }));
  }, [experienceList, setResumeInfo]);

  // Save the data to the backend.
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Update global context immediately on save.
    setResumeInfo((prev) => ({ ...prev, experience: experienceList }));

    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    console.log("Data to be saved:", experienceList);

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

  return (
    <div>
      {
          resumeInfo?.fieldRequired?.Experience ?<div className="p-5 border-t-purple-600 rounded-lg shadow-lg border-t-8">
        <h1 className="font-bold text-lg text-center mb-2">Professional Experience</h1>
        <p className="font-semibold text-sm">Add your previous job experience</p>
  
        {addExpi && (
          <div className="flex justify-between w-full">
            <div className="gap-5 flex">
              <Button onClick={addExperience} variant="outline" className="text-purple-600">
                + Add Experience
              </Button>
            </div>
          </div>
        )}
  
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 p-3 gap-3 border my-5">
              <label>
                Position Title
                <Input
                  value={item.title}
                  onChange={(event) => handleChange(index, event)}
                  name="title"
                  type="text"
                />
              </label>
              <label>
                Company Name
                <Input
                  value={item.companyName}
                  onChange={(event) => handleChange(index, event)}
                  name="companyName"
                  type="text"
                />
              </label>
              <label>
                City
                <Input
                  value={item.city}
                  onChange={(event) => handleChange(index, event)}
                  name="city"
                  type="text"
                />
              </label>
              <label>
                State
                <Input
                  value={item.state}
                  onChange={(event) => handleChange(index, event)}
                  name="state"
                  type="text"
                />
              </label>
              <label>
                Start Date
                <Input
                  value={item.startDate}
                  onChange={(event) => handleChange(index, event)}
                  name="startDate"
                  type="date"
                />
              </label>
              <div className="flex items-center justify-evenly gap-3">
                <label>
                  End Date
                  <Input
                    value={item.endDate}
                    onChange={(event) => handleChange(index, event)}
                    name="endDate"
                    type="date"
                    
                  />
                </label>
                <label className="flex flex-row-reverse items-center justify-evenly gap-2">
                  Present
                  <Input
                    name="present"
                    type="checkbox"
                    className="h-4"
                    checked={item.present}
                    onChange={(event) => handleCheckboxChange(index, event)}
                  />
                </label>
              </div>
              <div className="col-span-2">
                <TextEditor
                  defaultValue={item.workSummary}
                  index={index}
                  onRichTextEditorChange={(e) => handleTextEditor(e, "workSummary", index)}
                />
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
              <Button onClick={onSave}>
                {loading ? <LoaderCircleIcon className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        ))}
      </div>:<div className="flex  items-center">
      <div className="font-semibold justify-center mt-32 items-center">You havent Selected <span className="text-purple-600">Experience</span> Field Click Next or Go back and select <span className="text-purple-600">Experience</span> Field</div>
      </div>
      }
    </div>
  );
}

export default Experience;
