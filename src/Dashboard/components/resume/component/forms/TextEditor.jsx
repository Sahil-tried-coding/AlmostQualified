import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  createButton,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "../../../../../components/ui/button";
import { BrainIcon, LoaderCircle } from "lucide-react";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import AIchatSession from "../../../../../../Service/GenerateAI";







const TextEditor = ({ onRichTextEditorChange,index}) => {
  const PROMPTOM = "Job role: {JobTitle}. Provide a single detailed experience summary paragraph (two-three lines) without structuring it in JSON or breaking it into multiple lines.and dont add heading experience_summary : like this"
  const [value, setValue] = useState();


  const [loading, setLoading] = useState(false)

  const{resumeInfo,setResumeInfo} = useContext(ResumeContext)

  const GenerateFromAi = async () =>{
    setLoading(true)
    const prompt = PROMPTOM.replace("{JobTitle}",resumeInfo?.experience[index]?.title)
    const result = await AIchatSession.sendMessage(prompt)
    const resp = await (result.response.text())

    console.log(resp)
    // console.log(JSON.parse(resp))
    setValue(resp)
    // console.log(JSON.parse(result.response.text()))
    // console.log("this is the backchodi",JSON.parse(result.response.text()))
    // console.log(resp.data)
    // console.log(prompt)
setLoading(false)
  }
const GenerateWithAi = async () =>{
    setLoading(true)
    const prompt = PROMPTOM.replace("{JobTitle}",resumeInfo?.experience[index]?.title)
    const result = await AIchatSession.sendMessage(prompt)

    // console.log(result.response.text())
    console.log(JSON.parse(result.response.text()))
    // setValue(result.response.text())
    setValue(result.response.text().replace("["," ").replace("]"," ").replace('"'," "))
    console.log("this is the aigenerated list " , value)
    setLoading(false)
  }


// const generateFromAi = async()=>{
//     const prompt = PROMPT.replace("{JobTitle",)
// }
  return (
    <EditorProvider>
      <div className="flex  justify-end items-center mb-2">
              {/* <h1>Add Summary</h1> */}
              {
                loading ? <LoaderCircle className="animate-spin" />:<Button
                onClick={GenerateWithAi}
                
                  size="sm"
                  variant="outline"
                  className="bg-white border justify-end items-center border-purple-600 text-purple-600 flex gap-3"
                >
                  <BrainIcon/> Generate With Ai 
                </Button>
              }
            </div>
      <Editor
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          console.log('Editor value:', e.target.value);
          onRichTextEditorChange(e)
        }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnClearFormatting />
          <Separator />
          {/* <BtnStyles /> */}
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};
export default TextEditor


    // setValue(result.response.text().replace("["," ").replace("]"," ").replace('"'," "))
