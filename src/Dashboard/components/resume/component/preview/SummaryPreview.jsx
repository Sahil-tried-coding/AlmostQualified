import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <div className='font-semibold text-xs'>
        <h1></h1>
        <h1>{resumeInfo?.summary}</h1>
    </div>
  )
}

export default SummaryPreview