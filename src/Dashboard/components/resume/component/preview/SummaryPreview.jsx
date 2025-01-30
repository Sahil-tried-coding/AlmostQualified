import React from 'react';

function SummaryPreview({ resumeInfo }) {
  // console.log(resumeInfo?.summary)
  return (
    <div className='font-semibold text-xs w-full   max-h-48 overflow-auto p-2 rounded-lg'>
      <h1>{resumeInfo?.summary}</h1>
    </div>
  );
}

export default SummaryPreview;
