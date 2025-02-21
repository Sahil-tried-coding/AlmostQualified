import React, { useContext, useEffect, useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "../../../../components/ui/button";
import { 
  ArrowLeftFromLineIcon, 
  ArrowRightFromLineIcon, 
  EditIcon,
  CheckCircleIcon, 
  HomeIcon
} from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skiils from "./forms/Skills";
import Skills from "./forms/Skills";
import AddYourField from "./forms/AddYourField";
import Projects from "./forms/Projects";
import { ResumeContext } from "../../../../Context/ResumeContext";
import { Link, Navigate, useParams } from "react-router-dom";
import Theme from "./Theme";


function Form() {
  const TOTAL_STEPS = 8;
  const {resumeInfo,setResumeInfo} = useContext(ResumeContext)
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableButton, setEnableButton] = useState(true);

  const params = useParams()
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
    <div className="">
      <div className="flex justify-between gap-3 my-4 ">
        <div className="flex gap-5 sm:gap-14">
        <Link to={'/'}><Button variant="outline"> <HomeIcon /></Button></Link>
        <Theme/>
        </div>
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
          {activeIndex < 7 ? (
            <Button 
            // disabled={!enableButton}
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleNext}
            >
              Next
              <ArrowRightFromLineIcon className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
            onClick={handleNext}
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
      {  activeIndex === 4 && <Experience />}
      { activeIndex === 5 && <Projects />}
      {activeIndex === 6 && <Education />}
      {  activeIndex === 7 && <Skills />}
      {  activeIndex === 8 && <Navigate to={`/my-resume/${params?.resume_id}/view`}/>}
      {/* Add other form steps here */}
    </div>
  );
}

export default Form;