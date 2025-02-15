import React, { useContext, useEffect, useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "../../../../components/ui/button";
import { 
  ArrowLeftFromLineIcon, 
  ArrowRightFromLineIcon, 
  EditIcon,
  CheckCircleIcon 
} from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skiils from "./forms/Skills";
import Skills from "./forms/Skills";
import AddYourField from "./forms/AddYourField";
import Projects from "./forms/Projects";
import { ResumeContext } from "../../../../Context/ResumeContext";


function Form() {
  const TOTAL_STEPS = 7;
  const {resumeInfo,setResumeInfo} = useContext(ResumeContext)
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableButton, setEnableButton] = useState(false);
  const handleNext = () => {
    if (activeIndex < TOTAL_STEPS) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 1) {
      setActiveIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
      if (resumeInfo?.fieldRequired && Array.isArray(resumeInfo.fieldRequired)) {
          setEnableButton(true)
        // Convert array back to an object for UI state
        
      } else {
        setEnableButton(false)
      }
    }, []);


  return (
    <div className="w-[43%]">
      <div className="flex justify-between gap-3 my-4">
        <Button variant="outline">
          <EditIcon className="mr-2 h-4 w-4" /> Theme 
        </Button>
        
        <div className="flex gap-2">
          {/* Always show Previous if not on first step */}
          {activeIndex > 1 && (
            <Button 
              onClick={handlePrevious}
              variant="outline"
            >
              <ArrowLeftFromLineIcon className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}

          {/* Show Next until last step */}
          {activeIndex < TOTAL_STEPS ? (
            <Button 
            disabled={!enableButton}
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleNext}
            >
              Next
              <ArrowRightFromLineIcon className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="bg-green-600 text-white hover:bg-green-700"
              type="submit"
            >
              Submit
              <CheckCircleIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Form steps */}
      {activeIndex === 1 && <AddYourField setEnableButton={setEnableButton} enableButton={enableButton}/> }
      {activeIndex === 2 && <PersonalDetails setEnableButton={setEnableButton} enableButton={enableButton}/>}
      {activeIndex === 3 && <Summary />}
      {activeIndex === 4 && <Experience />}
      {activeIndex === 5 && <Projects />}
      {activeIndex === 6 && <Education />}
      {activeIndex === 7 && <Skills />}
      {/* Add other form steps here */}
    </div>
  );
}

export default Form;