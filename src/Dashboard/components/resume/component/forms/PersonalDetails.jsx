import React, { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";
import { LoaderCircleIcon } from "lucide-react";

function PersonalDetails({ enableButton, setEnableButton }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // console.log(resumeInfo)

  // let personalUser = ;
  // useEffect(()=>{

  //    GlobalAPI.GetResumeById(params?.resume_id).then((resp)=>{
  //     console.log(resp.data)
 
  //   })

  // },[])
  // console.log(personalUser.data)
  const onSave = async (e) => {
    e.preventDefault();
    setEnableButton(true);
    setLoading(true);

    const data = {
      data: formData,
    };

    console.log("Form Data being sent:", data);
    try {
      const response = await GlobalAPI.UpdateFormData(params?.resume_id, data);
      console.log("✅ API Response:", response);
      localStorage.setItem("resumeData", JSON.stringify(resumeInfo));
    } catch (error) {
      console.error("❌ Error while saving:", error);
    } finally {
      setLoading(false);
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
      [name]: value,
    });
  };

  return (
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">Personal Details</h1>
      <p className="font-semibold text-sm">
        Getting started with the basic information
      </p>

      <form onSubmit={onSave} className="grid grid-cols-2 gap-4 mt-5 mb-3">
        <label>
          First Name
          <Input
            defaultValue={resumeInfo?.firstName}
            required
            name="firstName"
            onChange={handleInput}
          />
        </label>
        <label>
          Last Name
          <Input
            defaultValue={resumeInfo?.lastName}
            required
            name="lastName"
            onChange={handleInput}
          />
        </label>
        <label className="col-span-2">
          Job Title
          <Input
            defaultValue={resumeInfo?.jobTitle}
            required
            name="jobTitle"
            onChange={handleInput}
          />
        </label>
        <label className="col-span-2">
          Address
          <Input
            defaultValue={resumeInfo?.address}
            required
            name="address"
            onChange={handleInput}
          />
        </label>
        <label>
          Phone
          <Input
            defaultValue={resumeInfo?.phone}
            required
            name="phone"
            onChange={handleInput}
          />
        </label>
        <label>
          Email
          <Input
            defaultValue={resumeInfo?.email}
            required
            name="email"
            onChange={handleInput}
          />
        </label>

        <Button type="submit" className="w-40 flex items-center justify-center">
          {loading ? <LoaderCircleIcon className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}

export default PersonalDetails;
