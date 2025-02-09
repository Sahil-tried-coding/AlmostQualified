import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { BrainCircuitIcon, BrainIcon, LoaderCircleIcon } from "lucide-react";
import GlobalAPI from "../../../../../../Service/GlobalAPI";
import { useParams } from "react-router-dom";
import { AIchatSession } from "./../../../../../../Service/GenerateAI";

function Summary() {
  // const propmt = "job role : {Job Title} give the summary for the resume based on job role more like it should sound good with good ats within 4-5 lines"
  const propmt =
    "Generate a 4-5 line resume summary in JSON format for a {Job Title} based on experience level (Fresher, Mid-Level, Experienced). The JSON should include fields: ExperienceLevel and Summary. Ensure the summary is concise, highlights key skills, and aligns with industry standards";
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo.summary || null);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([{}]);

  const params = useParams();

  const GenerateWithAi = async () => {
    setLoading(true);
    const PROMPT = propmt.replace("{Job Title}", resumeInfo.jobTitle);
    console.log(PROMPT);
    const result = await AIchatSession.sendMessage(PROMPT);

    // console.log(result.response.text())
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummaryList(JSON.parse(result.response.text()));
    console.log("this is the aigenerated list ", aiGeneratedSummaryList);
    setLoading(false);
  };


  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      summary: summary,
    });
  }, [summary]);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateResumeInfo = {
      ...resumeInfo,
      summary: summary,
    };
    setResumeInfo(updateResumeInfo);
    const data = {
      data: {
        summary: summary,
      },
    };
    // console.log(data)
    try {
      //   const resp = await GlobalAPI.MyOneResume(params?.resume_id);
      const resp = await GlobalAPI.UpdateFormData(params?.resume_id, data);
      console.log(resp);
    } catch (error) {
      console.log("catch wala errror haiii", error);
    }
    setLoading(false);
  };
  return (
    <div className="p-5 border-t-purple-600 rounded-lg shadow-lg  border-t-8">
      <h1 className="font-bold text-lg text-center mb-2">Summary</h1>
      <p className="font-semibold text-sm">Job Title Summary Required</p>
      <div className="flex justify-end items-end">
        {/* <h1>Add Summary</h1> */}
        <Button
          onClick={() => GenerateWithAi()}
          size="sm"
          variant="outline"
          className="bg-white border border-purple-600 text-purple-600 flex gap-3"
        >
          <BrainIcon /> Generate With Ai
        </Button>
      </div>

      <form onSubmit={onSave} className="gap-5 flex flex-col">
        <Textarea
          //  defaultValue={resumeInfo?.summary}
          name="summary"
          value={summary}
          required
          onChange={(e) => setSummary(e.target.value)}
          className="h-32 mt-3"
        />
        <div className=" flex  justify-end">
          <Button type="submit" className="w-40 ">
            {loading ? <LoaderCircleIcon className=" animate-spin" /> : "Save"}
            {/* Save */}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList.length > 1 && (
        <div className="shadow-xl my-3">
          <h1 className="font-bold text-xl">Suggestions</h1>
          {aiGeneratedSummaryList.map((item, index) => (
            // <h1 key={index}>hello</h1>
            <div
              key={index}
              className="shadow-md p-4 my-3 gap-2 flex flex-col  border-black border-2 cursor-pointer"
              onClick={() => {
                setSummary(item.Summary);
                setResumeInfo((prev) => ({
                  ...prev,
                  summary: item.Summary,
                }));
              }}
            >
              <h1 className="text-purple-600 font-semibold text-lg">
                {" "}
                {item.ExperienceLevel}
              </h1>
              <h1 className="text-sm font-semibold">{item.Summary}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
