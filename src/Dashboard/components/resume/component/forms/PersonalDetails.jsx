import React, { useContext, useState } from "react";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";

function PersonalDetails({ enableButton, setEnableButton }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

  const [formData, setFormData] = useState()

  const params= useParams()
  
console.log("this is the resume is" ,params)
console.log("form data ->" ,formData)
  const onSave = (e) => {
      e.preventDefault();
    setEnableButton(true);

    const data = {
        data:formData
    }
    GlobalAPI.UpdateFormData(params?.resumeId ,data).then(resp => {
        console.log(resp)
    })
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
