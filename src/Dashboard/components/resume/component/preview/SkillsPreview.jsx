import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className='my-3'>
        <h1
        className="text-center font-bold "
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h1>
      <hr
        className="border-2 my-3 border-black"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />


      <div className='grid grid-cols-2 gap-3 my-4'>
      {
        resumeInfo?.skills.map((item,index)=>(
            <div className='flex justify-between items-center' key={index}>
                <h1>{item.name}</h1>
                <div className='w-[120px] bg-slate-200 h-2 '>
                    <div className='h-2' style={{backgroundColor:resumeInfo?.themeColor,
                            width:item?.rating+'%'}}>
                        {/* <div >

                        </div> */}

                    </div>
                </div>
            </div>

        ))
      }
      </div>
    </div>
  )
}

export default SkillsPreview