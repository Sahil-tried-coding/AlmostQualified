import React from 'react'
import  { useContext } from 'react'
import { ResumeContext } from '../../../../../Context/ResumeContext';

function  SkillsPreview({resumeInfo}) {
  // const { fieldSelected, setFieldSelected } = useContext(ResumeContext);
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


{resumeInfo?.fieldRequired?.Skills &&<div className='grid grid-cols-2 gap-3 my-4'>
      {
         resumeInfo?.skills.map((item,index)=>(
            <div className='flex justify-between items-center' key={index}>
                <h1>{item.skillName}</h1>
                <div className='w-[120px] bg-slate-200 h-2 '>
                    <div className='h-2' style={{backgroundColor:resumeInfo?.themeColor || '#ff6666',
                            width:item?.rating+'%'}}>
                            {/* width:item?.rating*20+'%'}}> */}
                        {/* <div >

                        </div> */}

                    </div>
                </div>
            </div>

        ))
      }
      </div>}
    </div>
  )
}

export default SkillsPreview