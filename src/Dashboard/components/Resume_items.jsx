import { LoaderCircleIcon, MoreVertical, Notebook } from 'lucide-react'
import { ShinyButton } from "../../components/magicui/shiny-button";
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import SpotlightCard from '../../Custom/Spotlight'
import GlobalAPI from '../../../Service/GlobalAPI';

function Resume_items(resume) {

  // const params = useParams()
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigate()
    // console.log(resume)


    const deleteResumeItem = () =>{
      setLoading(true)
      GlobalAPI.DeleteById(resume?.resume?.documentId).then((resp)=>{
        console.log(resp)
        // refreshData()
        setLoading(false)
      }).catch((error)=>{
        console.log(error)
        setLoading(true)
      })
      
    }






  return (
    <div className='flex flex-col gap-5'>

    
    <Link  to={`/dashboard/resume/`+resume.resume.documentId+"/edit"}>
      <SpotlightCard  className="border-2 border-purple-600 custom-spotlight-card sm:w-[230px] h-[200px] bg-secondary flex justify-center items-center flex-col  hover:scale-105 transition-all hover:cursor-pointer hover:shadow-lg rounded-md" spotlightColor="rgba(54, 205, 255, 0.8)">
            <h1 className='font-semibold capitalize'>{resume.resume.title}</h1>
        
        </SpotlightCard>
    </Link>
        <div className='flex justify-evenly items-center sm:w-[230px] text-center' >
            {/* <h1></h1> */}
            {/* <Notebook/> */}

   <ShinyButton  className='font-semibold capitalize whitespace-nowrap'>{resume.resume.title} ✅</ShinyButton>
   
   <DropdownMenu>
  <DropdownMenuTrigger><MoreVertical/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={()=>navigation(`/dashboard/resume/`+resume.resume.documentId+"/edit")}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigation(`/my-resume/`+resume.resume.documentId+"/view")}>View</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigation(`/my-resume/`+resume.resume.documentId+"/view")}>Download</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setAlert(true)}>Delete



    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    <AlertDialog open={alert}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setAlert(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteResumeItem()}>{loading ? <LoaderCircleIcon className='animate-spin'/>:"Continue"}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </div>
    {/* </Link> */}
    </div>
  )
}

export default Resume_items