import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Sigin from './Auth/index.jsx'
import Home from './Home/index.jsx'
import Dashboard from './Dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Dashboard/components/resume/[resumeid]/edit/index.jsx'
// import EditResume from './Dashboard/resume/[resumeid]/edit/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if( PUBLISHABLE_KEY){
//   return null
// }


const router = createBrowserRouter([
  {
    element:<App/>,
    children:[
     {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/dashboard/resume/:resume_id/edit",
        element:<EditResume/>
      }
    ] 
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/auth/sign-in',
    element:<Sigin/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    
    <RouterProvider router={router}/>
    </ClerkProvider>
  </StrictMode>,
)
