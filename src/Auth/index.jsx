import { SignedIn, SignIn } from "@clerk/clerk-react"

function Sigin() {
  return (
    <div className="flex items-center justify-center">
        <SignIn />
        <SignedIn/>
    </div>
  )
}

export default Sigin