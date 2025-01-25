import React from 'react'

function EducationPreview({resumeInfo}) {
  return (
    <div className='my-3'>
        <h1
        className="text-center font-bold "
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h1>
      <hr
        className="border-2 my-3 border-black"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {
        resumeInfo?.education.map((item,index)=>(
            <div  className='my-2' key={index}>
                <h1 className='font-bold text-sm' style={{ color: resumeInfo?.themeColor }}>{item.universityName}</h1>
                <div className='text-xs font-semibold flex justify-between'><h1>{item.degree} in {item.major}</h1> <h1>{item.startDate} {item.endDate}</h1></div>
                <h1 className='text-xs font-semibold'>{item.description}</h1>
            </div>
        ))
      }
    </div>
  )
}

export default EducationPreview