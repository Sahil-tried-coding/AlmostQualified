import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "../../../../components/ui/button";
import { ArrowBigLeft, ArrowBigLeftIcon, ArrowBigRight, ArrowBigRightIcon, ArrowLeftFromLineIcon, ArrowRightFromLineIcon, EditIcon } from "lucide-react";
function Form() {


  const [activeIndex, setactiveIndex] = useState(1)

  const [enableButton, setEnableButton] = useState(false)
  return (
    <div className="w-[43%]">


<div className="flex justify-between gap-3 my-4">
  <Button variant="outline"><EditIcon/> Theme </Button>
  
  {
    activeIndex > 1 ? <Button onClick={()=>setactiveIndex(activeIndex -1)} variant="outline">  <ArrowLeftFromLineIcon/> </Button> : ""
  }
  {
    activeIndex == 1 ? <Button className="bg-purple-600 text-white cursor-pointer" disabled={!enableButton} onClick={()=>setactiveIndex(activeIndex +1)} variant="outline">Next  <ArrowRightFromLineIcon/> </Button>:""
  }
</div>


      {/* personal details */}
      {
        activeIndex == 1? <PersonalDetails setEnableButton={setEnableButton} enableButton={e=>setEnableButton(e)}/> : null
      }
      {/* summary */}

      {/* experience  */}

      {/* educational  */}

      {/* skills */}
    </div>
  );
}

export default Form;
