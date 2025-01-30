import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Sigin from './Auth'
import Header from './Custom/Header'

function App() {

  const {isSignedIn,user,isLoaded} =useUser();

  if(!isSignedIn && isLoaded){
    return <Navigate to="/auth/sign-in"/>
  }
  return (
    <>
  <Header/>
      <Outlet  />
    </>
  )
}

export default App
