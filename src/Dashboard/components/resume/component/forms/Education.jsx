import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
// import { Input } from 'postcss';
import TextEditor from "./TextEditor";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { LoaderCircleIcon } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";

function Education() {
  const params = useParams();

  const formField = {
    universityName: "",
    degree: "",
    major: "",
    description: "",
    startDate: "",
    endDate: "",
    isPresent: false,
  };

  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [educationList, setEducationList] = useState([formField]);
  const [addEdu, setAddEdu] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      resumeInfo?.education &&
      Array.isArray(resumeInfo.education) &&
      resumeInfo.education.length > 0
    ) {
      setEducationList(resumeInfo.education);
    } else {
      setEducationList([formField]);
      console.log("Initialized with default experience.");
    }
  }, []); // run once on mount

  // Fetch experience data from the backend on mount.
  const getUserEducation = async () => {
    try {
      const userData = await GlobalAPI.GetEducationComponent(params?.resume_id);
      console.log("the education component is this ---->", userData.data?.data);
      // If the fetched data has an experience array, update local state.
      if (
        userData.data?.data?.education &&
        Array.isArray(userData.data.data.education)
      ) {
        setEducationList(userData.data.data.education);
      } else {
        setEducationList([formField]);
      }
      console.log("Fetched experience:", userData.data?.data?.education);
    } catch (error) {
      console.error("Error fetching experience:", error);
      setEducationList([formField]);
    }
  };

  useEffect(() => {
    getUserEducation();
  }, [params?.resume_id]);

  // Handle text input changes.
  const handleChange = (index, event) => {
    const newEntries = [...educationList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
    console.log("Updated entry at index", index, ":", newEntries[index]);
  };

  // Handle checkbox changes for "present"
  const handleCheckboxChange = (index, event) => {
    const newEntries = [...educationList];
    newEntries[index].isPresent = event.target.checked;
    setEducationList(newEntries);
    console.log("Checkbox changed at index", index, "to", event.target.checked);
  };

  // Append a new experience entry.
  const addEducation = () => {
    setAddEdu(false);
    setEducationList([...educationList, { ...formField }]);
  };

  // Remove the last experience entry.
  const removeEducation = () => {
    setEducationList((prev) => prev.slice(0, -1));
  };

  // Update the global context whenever the local experienceList changes.
  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, education: educationList }));
  }, [educationList,resumeInfo]);

  // Save the data to the backend.
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Update global context immediately on save.
    setResumeInfo((prev) => ({ ...prev, education: educationList }));

    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
      },
    };

    console.log("Data to be saved:", educationList);

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
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">Education</h1>
      <p className="font-semibold text-sm">Add your Education</p>

      {addEdu && (
        <div className="flex justify-between w-full">
          <div className="gap-5 flex">
            <Button
              onClick={addEducation}
              variant="outline"
              className="text-purple-600"
            >
              + Add Education
            </Button>
          </div>
        </div>
      )}

      {educationList.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 p-3 gap-3 border my-5">
            <label className=" col-span-2">
              University Name
              <Input
                value={item.universityName || ""}
                onChange={(event) => handleChange(index, event)}
                name="universityName"
                type="text"
              />
            </label>
            <label>
              degree
              <Input
                value={item.degree || ""}
                onChange={(event) => handleChange(index, event)}
                name="degree"
                type="text"
              />
            </label>
            <label>
              major
              <Input
                value={item.major || ""}
                onChange={(event) => handleChange(index, event)}
                name="major"
                type="text"
              />
            </label>

            <label>
              Start Date
              <Input
                value={item.startDate || ""}
                onChange={(event) => handleChange(index, event)}
                name="startDate"
                type="date"
              />
            </label>
            <div className="flex items-center justify-evenly gap-3">
              <label>
                End Date
                <Input
                  value={item.endDate || ""}
                  onChange={(event) => handleChange(index, event)}
                  name="endDate"
                  type="date"
                />
              </label>
              <label className="flex flex-row-reverse items-center justify-evenly gap-2">
                Present
                <Input
                  name="isPresent"
                  type="checkbox"
                  className="h-4"
                  checked={item.isPresent || ""}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
              </label>
            </div>
            <label className=" col-span-2 ">
              Description
              <Textarea
                onChange={(event) => handleChange(index, event)}
                type="textarea"
                className="h-10 "
                name="description"
                index={index}
                value={item.description}
              />
            </label>
          </div>
          <div className="flex justify-between w-full">
            <div className="gap-5 flex">
              <Button
                onClick={addEducation}
                variant="outline"
                className="text-purple-600"
              >
                + Add more Education
              </Button>
              <Button
                onClick={removeEducation}
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

export default Education;
