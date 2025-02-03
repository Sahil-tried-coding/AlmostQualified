import React, { useState } from "react";
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




const PROMPT = "Job role : {JobTitle} based on the job role generate the 3  bullet points for resume experience section give in html format"
function TextEditor({ onRichTextEditorChange }) {

const generateFromAi = async()=>{
    const prompt = PROMPT.replace("{JobTitle",)
}
  const [value, setValue] = useState();
  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e);
        }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          {/* <BtnLink /> */}
          <BtnClearFormatting />
          {/* <HtmlButton /> */}
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}

export default TextEditor;
