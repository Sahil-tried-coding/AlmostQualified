import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { LoaderCircleIcon } from "lucide-react";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";

function AddYourField({setEnableButton, enableButton}) {
  const [ fieldSelected, setFieldSelected ] = useState({
    Education:false,
    Experience:false,
    Project:false,
    Skills:false
  });
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false)
  // const [enableButton, setEnableButton] = useState(false)

  const params = useParams()
  const toggleField = (field) => {
    // Update the fieldSelected object by toggling the value for the given field.
    setFieldSelected((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  console.log("rando",fieldSelected)


  useEffect(() => {
    if (resumeInfo?.fieldRequired && Array.isArray(resumeInfo.fieldRequired)) {
        setEnableButton(true)
      // Convert array back to an object for UI state
      const selectedFieldsObject = {
        Education: resumeInfo.fieldRequired.includes("Education"),
        Experience: resumeInfo.fieldRequired.includes("Experience"),
        Project: resumeInfo.fieldRequired.includes("Project"),
        Skills: resumeInfo.fieldRequired.includes("Skills"),
      };
  
      setFieldSelected(selectedFieldsObject);
    } else {
      setFieldSelected({
        Education: false,
        Experience: false,
        Project: false,
        Skills: false,
      });
    }
  }, []);
  
  // useEffect(()=>{
  //   if(resumeInfo?.fieldRequired && Array.isArray(resumeInfo?.fieldRequired) && resumeInfo.fieldRequired.length > 0){
  //     setFieldSelected(resumeInfo?.fieldRequired)
  //   }
  //   else{
  //     setFieldSelected({
  //       Education:false,
  //   Experience:false,
  //   Project:false,
  //   Skills:false
  //     })
  //   }
  // },[])


  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, fieldRequired: fieldSelected }));
  }, [fieldSelected, setResumeInfo]);

//   const onSave = async () =>{
    
//     setLoading(true)
//     setEnableButton(true)

//     const data = {
//       data: {
//         fieldRequired: fieldSelected
//         // fieldRequired: fieldSelected.map(({ id, ...rest }) => rest),
//       },
//     };
// try {
//   const userdata = await GlobalAPI.UpdateFormData(params?.resume_id,data)
//   if(userdata.data){
//     console.log("successfully updated fields")
//   }
// } catch (error) {
//   console.log(error)
// }
    
// setLoading(false)

//   }


  // const onSave = async () => {
  //   setLoading(true);
  //   setEnableButton(true);
  
  //   // Convert selected fields object to an array of active fields
  //   const selectedFieldsArray = Object.keys(fieldSelected).filter(
  //     (key) => fieldSelected[key]
  //   );
  
  //   const data = {
      
  //       fieldRequired: selectedFieldsArray,  // 🔥 Send array instead of object
      
  //   };
  
  //   try {
  //     const userdata = await GlobalAPI.UpdateFormData(params?.resume_id, data);
  //     console.log("⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️",params?.resume_id)
  //     if (userdata.data) {
  //       console.log("Successfully updated fields");
  //     }
  //   } catch (error) {
  //     console.error("Error updating fields:", error);
  //   }
  
  //   setLoading(false);
  // };
  

  // const onSave = async () => {
  //   setLoading(true);
  //   setEnableButton(true);
  
  //   // Convert selected fields object to an array of field names (strings)
  //   const selectedFieldsArray = Object.keys(fieldSelected).filter(
  //     (key) => fieldSelected[key] // Only include fields that are true
  //   );
  
  //   const data = {
  //     data: {
  //       fieldRequired: selectedFieldsArray, // Send array of strings
  //     },
  //   };
  
  //   try {
  //     console.log("⬇️ Sending Data:", JSON.stringify(data, null, 2));
  //     const userdata = await GlobalAPI.UpdateFormData(params?.resume_id, data);
  //     if (userdata.data) {
  //       console.log("✅ Successfully updated fields");
  //     }
  //   } catch (error) {
  //     console.error("❌ Error updating fields:", error.response?.data || error.message);
  //   }
  
  //   setLoading(false);
  // };
  
  const onSave = async () => {
    setLoading(true);
    setEnableButton(true);

    // Convert selected fields object to a valid array of field names
    const selectedFieldsArray = Object.keys(fieldSelected).filter(
        (key) => fieldSelected[key]
    );

    // Ensure we pass the correct structure to Strapi
    const data = {
        data: {
            fieldRequired: selectedFieldsArray.reduce((acc, field) => {
                acc[field] = true;  // Convert to an object
                return acc;
            }, {}),
        },
    };

    try {
        console.log("⬇️ Sending Data:", JSON.stringify(data, null, 2));
        console.log("📌 Resume ID:", params?.resume_id);

        const userdata = await GlobalAPI.UpdateFormData(params?.resume_id, data);
        
        if (userdata?.data) {
            console.log("✅ Successfully updated fields:", userdata.data);
        } else {
            console.error("❌ Update failed:", userdata);
        }
    } catch (error) {
        console.error("❌ Error updating fields:", error.response?.data || error.message);
    }

    setLoading(false);
};

  return (
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">
        What Fields Do You Want in Your Resume?
      </h1>
      {/* <p className="font-semibold text-sm">Select your fields</p> */}
      <div className="flex justify-evenly mt-3">
        <Button
          className={`${fieldSelected.Experience ? "bg-green-600" : "bg-purple-500"}`}
          onClick={() => toggleField("Experience")}
        >
          Experience
        </Button>
        <Button
          className={`${fieldSelected.Project ? "bg-green-600" : "bg-purple-500"}`}
          onClick={() => toggleField("Project")}
        >
          Projects
        </Button>
        <Button
          className={`${fieldSelected.Education ? "bg-green-600" : "bg-purple-500"}`}
          onClick={() => toggleField("Education")}
        >
          Education
        </Button>
        <Button
          className={`${fieldSelected.Skills ? "bg-green-600" : "bg-purple-500"}`}
          onClick={() => toggleField("Skills")}
        >
          Skills
        </Button>
      </div>
      <Button onClick={onSave} className="mt-5 border-purple-600 border text-purple-500 bg-white">{loading?<LoaderCircleIcon className="animate-spin"/>:"Save The fields"}</Button>
    </div>
  );
}

export default AddYourField;
