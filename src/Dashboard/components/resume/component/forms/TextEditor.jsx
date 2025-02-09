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
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "../../../../../components/ui/button";
import { BrainIcon, LoaderCircle } from "lucide-react";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import AIchatSession from "../../../../../../Service/GenerateAI";

const PROMPTOM =
  "Job role: {JobTitle}. Provide a single detailed experience summary paragraph (one-two lines) without structuring it in JSON or breaking it into multiple lines.and dont add heading experience_summary : like this";

const TextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const { resumeInfo } = useContext(ResumeContext);

  const GenerateWithAi = async () => {
    setLoading(true);
    // Replace {JobTitle} with the title from resumeInfo if available.
    const prompt = PROMPTOM.replace(
      "{JobTitle}",
      resumeInfo?.experience?.[index]?.title || ""
    );
    try {
      const result = await AIchatSession.sendMessage(prompt);
      const rawText = await result.response.text();
      // Clean up the text (adjust as needed)
      const generatedText = rawText
        .replace("[", " ")
        .replace("]", " ")
        .replace(/"/g, " ");
      // Update the local editor value.
      setValue(generatedText);
      // Immediately notify the parent of the new value.
      onRichTextEditorChange({ target: { value: generatedText } });
    } catch (error) {
      console.error("Error generating AI text:", error);
    }
    setLoading(false);
  };

  return (
    <EditorProvider>
      <div className="flex justify-end items-center mb-2">
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Button
            onClick={GenerateWithAi}
            size="sm"
            variant="outline"
            className="bg-white border justify-end items-center border-purple-600 text-purple-600 flex gap-3"
          >
            <BrainIcon /> Generate With Ai
          </Button>
        )}
      </div>
      <Editor
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          // Pass the new value to the parent
          onRichTextEditorChange(e);
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

export default TextEditor;
