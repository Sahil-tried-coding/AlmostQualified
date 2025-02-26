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
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
// import EditResume from './Dashboard/resume/[resumeid]/edit/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY



const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
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
    path:'/my-resume/:resume_id/view',
    element:<ViewResume/>
  },
  {
    path:'/auth/sign-in',
    element:<Sigin/>
  }
])

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <StrictMode>
    
    <RouterProvider router={router}/>
  </StrictMode>,
    </ClerkProvider>
)
