import {  UserButton, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShinyButton } from "../components/magicui/shiny-button";
// import Button from 
function Header() {


  const{isSignedIn,user}=useUser();

  return (
    <div className="flex shadow-lg  w-[95%] h-[4rem] justify-between  border-2 mx-auto my-2 p-1">
       <Link to={'/'}> <img className="w-12 sm:w-14" src="/logo.svg" ></img></Link>
       <div className="flex gap-5 items-center">
       <Link to={'/auth/sign-in'}><ShinyButton >Login</ShinyButton></Link> 
        <div>
        {
          isSignedIn ? <div className="items-center flex gap-5">
              <Link to={"/dashboard"}>
              <Button className="bg-white text-purple-600 border border-purple-600" variant="">Dashboard</Button></Link>
              <UserButton/>
          </div>:<div className="items-center flex pr-3">
          <Button>Getting Started</Button>
          </div>
        }
        </div>
       </div>
    </div>
  )
}

export default Header