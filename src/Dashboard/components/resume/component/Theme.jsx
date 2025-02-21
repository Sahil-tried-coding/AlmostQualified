import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '../../../../components/ui/button'
import { EditIcon } from 'lucide-react'
import { ResumeContext } from '../../../../Context/ResumeContext'
import { useParams } from 'react-router-dom'
import GlobalAPI from '../../../../../Service/GlobalAPI'
  
function Theme() {

    const [selectedColor, setSelectedColor] = useState()

    const params = useParams()

    const {resumeInfo,setResumeInfo} = useContext(ResumeContext)
    const colors = [
        // Your original colors
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF",
        
        // Additional colors for themes
        "#1F1F1F", "#343A40", "#495057", "#6C757D", "#ADB5BD", // Elegant Professional
        "#007BFF", "#6610F2", "#E83E8C", "#FD7E14", "#28A745", 
        "#F8F9FA", "#E9ECEF", "#DEE2E6", "#CED4DA", "#ADB5BD", // Soft Minimalist
        "#17A2B8", "#6F42C1", "#DC3545", "#FFC107", "#20C997", 
        "#121212", "#1A1A2E", "#16213E", "#0F3460", "#E94560", // Tech AI
        "#00ADB5", "#393E46", "#222831", "#FFD369", "#FCE38A", 
        "#FF9A8B", "#FF6A88", "#FF99AC", "#FFC3A0", "#FF4E50", // Gradient Vibrant
        "#6A0572", "#AB83A1", "#E0AFA0", "#D6A2E8", "#A29BFE", 
        "#E1B382", "#C89666", "#A67B5B", "#6D4C41", "#38220F", // Earthy Natural
        "#99A799", "#D3E4CD", "#A3B18A", "#588157", "#3A5A40"
    ];


    const onColorSelect = (color) =>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        })
        const data ={
            data:{
                themeColor:color

            }
            
        }
        GlobalAPI.UpdateFormData(params?.resume_id,data).then((resp)=>{
            console.log("✅",resp)
        })
    }

  return (
    <div>
        <Popover>
  <PopoverTrigger asChild>
  <Button variant="outline" className="border border-purple-600">
          <EditIcon className="mr-2 h-4 w-4" /> Theme 
        </Button>
  </PopoverTrigger>
  <PopoverContent className='w-[90%]  sm:w-[550px] my-3 sm:mx-5 border-2 border-black'>
        <h1 className='font-semibold text-center underline'>Select The Color For Theme</h1>
    <div className='grid mb-2 grid-cols-10 cursor-pointer'>
        {
            colors.map((item,index)=>(
                <div onClick={()=>onColorSelect(item)} className='m-2 h-6 w-6 rounded-full border hover:border-black' key={index} style={{background:item}}>

                </div>
            ))
        }
    </div>
  </PopoverContent>
</Popover>

    </div>
  )
}

export default Theme