import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Sigin from './Auth'

function App() {

  const {isSignedIn,user,isLoaded} =useUser();

  if(!isSignedIn && isLoaded){
    return <Navigate to="/auth/sign-in"/>
  }
  return (
    <>

      <Outlet/>
    </>
  )
}

export default App
