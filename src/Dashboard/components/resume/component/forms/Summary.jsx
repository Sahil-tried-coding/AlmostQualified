import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { BrainCircuitIcon, BrainIcon, LoaderCircleIcon } from "lucide-react";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";
function Summary() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState();

  const params = useParams();
  console.log(summary);
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      summary: summary,
    });
  }, [summary]);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true)

    const data = {
      data: {
        summary:summary
      },
    };
    console.log(data)
    try {
    //   const resp = await GlobalAPI.MyOneResume(params?.resume_id);
      const resp = await GlobalAPI.UpdateFormData(params?.resume_id, data);
      console.log(resp);
    } catch (error) {
      console.log("catch wala errror haiii", error);
    }
    setLoading(false)
  };
  return (
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg  border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">Summary</h1>
      <p className="font-semibold text-sm">Job Title Summary Required</p>
      <div className="flex justify-end items-end">
        {/* <h1>Add Summary</h1> */}
        <Button
          size="sm"
          variant="outline"
          className="bg-white border border-purple-600 text-purple-600 flex gap-3"
        >
          <BrainIcon/> Generate With Ai 
        </Button>
      </div>
      <form onSubmit={onSave} className="gap-5 flex flex-col">
        <Textarea  
        defaultValue={resumeInfo.summary}
        name="summary"
          required
          onChange={(e) => setSummary(e.target.value)}
          className="h-32 mt-3"
        />
        <Button className="w-40 flex ">
          {loading ? <LoaderCircleIcon className=" animate-spin" /> : "Save"}
          {/* Save */}
        </Button>
      </form>
    </div>
  );
}

export default Summary;
