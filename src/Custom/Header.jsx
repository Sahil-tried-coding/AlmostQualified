import {  UserButton, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
// import Button from 
function Header() {
  const{isSignedIn,user}=useUser();

  return (
    <div className="flex shadow-lg  w-[95%] h-[4rem] justify-between  border-2 mx-auto my-2 p-1">
       <Link to={'/'}> <img src="/logo.svg" width={60} height={60}></img></Link>
        {
          isSignedIn ? <div className="items-center flex gap-5">
              <Link to={"/dashboard"}>
              <Button variant="outline">Dashboard</Button></Link>
              <UserButton/>
          </div>:<div className="items-center flex pr-3">
          <Button>Getting Started</Button>
          </div>
        }
    </div>
  )
}

export default Header