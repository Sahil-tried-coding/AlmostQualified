import React, { useContext, useState } from "react";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";

function PersonalDetails({ enableButton, setEnableButton }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

  const [formData, setFormData] = useState({})

  const params= useParams()
  
// console.log("this is the resume is" ,params)
// console.log("form data ->" ,formData)
  const onSave =  (e) => {
      e.preventDefault();
    setEnableButton(true);

    const data = {
        data:formData
    }
    console.log("this is the data of form ",data)
    try {
      GlobalAPI.UpdateFormData(params?.resumeId ,data).then((resp)=> {
        console.log(resp)
    })
    } catch (error) {
      console.log("this is the try catch wala error",error)
    }
  };

  const handleInput = (e) => {
    setEnableButton(false);
    const { name, value } = e.target;
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });

    setFormData({
        ...formData,
        [name]:value
    })
  };
  return (
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg  border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">Personal Details</h1>
      <p className="font-semibold text-sm">
        Gettting started with the basic information
      </p>

      <form
        onSubmit={onSave}
        className="grid grid-cols-2 gap-4 mt-5 "
        action=""
      >
        <label>
          First Name
          <Input required name="firstName" onChange={handleInput} />
        </label>
        <label>
          Last Name
          <Input required name="lastName" onChange={handleInput} />
        </label>
        <label className="col-span-2">
          Job
          <Input required name="jobTitle" onChange={handleInput} />
        </label>
        <label className="col-span-2">
          Address
          <Input required name="address" onChange={handleInput} />
        </label>
        <label className="">
          Phone
          <Input required name="phone" onChange={handleInput} />
        </label>
        <label className="">
          email
          <Input required name="email" onChange={handleInput} />
        </label>
        <Button className="w-24 ">Save</Button>
      </form>
    </div>
  );
}

export default PersonalDetails;











// import React, { useContext, useState } from "react";
// import { ResumeContext } from "../../../../../Context/ResumeContext";
// import { Input } from "../../../../../components/ui/input";
// import { Button } from "../../../../../components/ui/button";
// import GlobalAPI from "../../../../../../Service/GlobalAPI";
// import { useParams } from "react-router-dom";

// function PersonalDetails({ enableButton, setEnableButton }) {
//   const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
//   const [formData, setFormData] = useState({});
//   const [isLoading, setIsLoading] = useState(false); // For button state
//   const params = useParams();

//   const onSave = async (e) => {
//     e.preventDefault();
//     setEnableButton(true);
//     setIsLoading(true); // Disable the button while saving

//     if (!params?.resumeId) {
//       console.error("Resume ID is missing. Cannot save.");
//       alert("Resume ID is missing. Please reload the page.");
//       setIsLoading(false);
//       return;
//     }

//     const data = {
//       data: formData,
//     };

//     try {
//       console.log("Sending data to API:", data);
//       const resp = await GlobalAPI.UpdateFormData(params.resumeId, data);
//       console.log("API Response:", resp);

//       if (resp?.status === 200) {
//         alert("Details saved successfully!");
//       } else {
//         alert("Failed to save. Check the backend for errors.");
//       }
//     } catch (error) {
//       console.error("Error while saving:", error);
//       alert("An error occurred while saving. Please try again.");
//     } finally {
//       setIsLoading(false); // Re-enable the button
//     }
//   };

//   const handleInput = (e) => {
//     setEnableButton(false);
//     const { name, value } = e.target;

//     setResumeInfo({
//       ...resumeInfo,
//       [name]: value,
//     });

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="p-5 border-t-purple-600 rounded-lg shadow-lg border-t-8">
//       <h1 className="font-bold text-lg text-center mb-2">Personal Details</h1>
//       <p className="font-semibold text-sm">Getting started with the basic information</p>

//       <form onSubmit={onSave} className="grid grid-cols-2 gap-4 mt-5">
//         <label>
//           First Name
//           <Input required name="firstName" onChange={handleInput} />
//         </label>
//         <label>
//           Last Name
//           <Input required name="lastName" onChange={handleInput} />
//         </label>
//         <label className="col-span-2">
//           Job
//           <Input required name="jobTitle" onChange={handleInput} />
//         </label>
//         <label className="col-span-2">
//           Address
//           <Input required name="address" onChange={handleInput} />
//         </label>
//         <label>
//           Phone
//           <Input required name="phone" onChange={handleInput} />
//         </label>
//         <label>
//           Email
//           <Input required name="email" onChange={handleInput} />
//         </label>
//         <Button type="submit" className="w-24" disabled={isLoading}>
//           {isLoading ? "Saving..." : "Save"}
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default PersonalDetails;
