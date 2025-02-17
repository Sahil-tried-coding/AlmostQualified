import React, { useEffect, useState } from 'react'
import Header from '../../../Custom/Header'
import { Button } from '../../../components/ui/button'
import { useParams } from 'react-router-dom'
// import GlobalApi from "../../../../Service/GlobalAPI.js"
import GlobalAPI from '../../../../Service/GlobalAPI.js'
import ResumePreview from '../../../Dashboard/components/resume/component/ResumePreview.jsx'
import { ResumeContext } from '../../../Context/ResumeContext.jsx'
import { RWebShare } from 'react-web-share'
function ViewResume() {

    const [resumeInfo,setResumeInfo] = useState()

    const params = useParams()


    const handleDownload = () =>{
      window.print()
    }


    useEffect(()=>{

      GlobalAPI.GetResumeById(params.resume_id).then((resp)=>setResumeInfo(resp.data.data))


    },[])

  return (
    <ResumeContext.Provider value={{setResumeInfo,resumeInfo}}>
        <div id='no-print'>
        <Header/>
        <div className=' font-semibold flex justify-center items-center mx-auto flex-col'>
            <h1>Congratulations you have created the ultimate Resume</h1>
            <div className='flex gap-12 items-center justify-center mt-4'>
            <RWebShare
        data={{
          text: "Hello evryone this is my Resume Please have a look",
          url: import.meta.env.VITE_BASE_URL+`my-resume/${params.resume_id}/view`,
          title: resumeInfo?.firstName + resumeInfo?.lastName,
        }}
        onClick={() => console.log("shared successfully!")}
      >
            <Button>Share 🔗</Button>
      </RWebShare>
            <Button variant="outline" onClick={handleDownload}>Download</Button>
            </div>
        </div>
        </div>
            <div id='print-area' className='my-10 mx-10 md:mx-20 lg:mx-36'>
              <ResumePreview/>
            </div>
    </ResumeContext.Provider>
  )
}

export default ViewResume