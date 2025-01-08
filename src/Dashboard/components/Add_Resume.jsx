import { PlusSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useUser } from "@clerk/clerk-react";
import GlobalAPI from "../../../Service/GlobalAPI"


function Add_Resume() {
  const {user} = useUser()
  
  const [openDailog, setOpenDailog] = useState(false);
  const [title, settitle] = useState()


  const onCreate = async () =>{
    const uid = uuidv4();
    const data = {
      data : {
        "title":title,
        "user-email": user.primaryEmailAddress.emailAddress,
        "resume-id":uid,
        "user-name":user.fullName
      }
    }
    GlobalAPI.CreateNewResume(data).then(resp=>{
      console.log(resp.data)
    })
  }
  return (
    <div>
      <div
        onClick={() => setOpenDailog(true)}
        className="w-[180px] h-[200px] bg-slate-100 flex justify-center items-center border-2 border-black border-dashed hover:scale-105 transition-all hover:cursor-pointer hover:shadow-lg rounded-md"
      >
        <PlusSquare />
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader className="gap-5">
            <DialogTitle> Enter Your Resume Title</DialogTitle>
            <DialogDescription>
              <Input onChange={(e)=>settitle(e.target.value)} placeholder="Ex. Front-end Resume" />
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setOpenDailog(false)} variant="ghost">
            Cancel
          </Button>
          <Button disabled={!title} onClick={onCreate}>Create</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Add_Resume;
