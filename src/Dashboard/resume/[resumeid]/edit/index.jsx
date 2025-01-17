import React, { useEffect } from "react";
import Header from "../../../../Custom/Header";
import { useParams } from "react-router-dom";

function EditResume() {


  const params = useParams()

  useEffect(()=>{
    console.log(params)
  },[])

  return (
    <div>
      This is Edit resume page
    </div>
  );
}

export default EditResume;
