import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Resume_items(resume) {
    // console.log(resume)
  return (
    <Link to={`/dashboard/resume/`+resume.resume.resume_id+"/edit"}>
        <div className="w-[180px] h-[200px] bg-secondary flex justify-center items-center flex-col  hover:scale-105 transition-all hover:cursor-pointer hover:shadow-lg rounded-md">
            <Notebook/>
            <h1>{resume.resume.title}</h1>
        </div>
    </Link>
  )
}

export default Resume_items