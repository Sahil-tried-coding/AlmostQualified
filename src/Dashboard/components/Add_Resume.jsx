import { LoaderCircle, PlusSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
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
import GlobalAPI from "../../../Service/GlobalAPI";
import { useNavigate, useNavigation } from "react-router-dom";

function Add_Resume() {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const navigation = useNavigate()

  const [loading, setLoading] = useState(false)
  // const navigatg =Navigate()

  const onCreate = async () => {
    const uid = uuidv4();

    const data = {
      data: {
        title: title,
        user_email: user.primaryEmailAddress.emailAddress,
        resume_id: uid,
        user_name: user?.fullName,
      },
    };
    
    try {
      setLoading(true)
      const resp = await GlobalAPI.CreateNewResume(data);
      console.log("Success:", resp.data);
      if(resp.data.data.documentId){
        setLoading(false)
        navigation("/dashboard/resume/"+resp.data.data.documentId+"/edit")
        
      }
      
      
      setOpenDialog(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  
  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="w-[180px] h-[200px] bg-slate-100 flex justify-center items-center hover:border-2 hover:border-black hover:border-dashed hover:scale-105 transition-all hover:cursor-pointer hover:shadow-lg rounded-md"
      >
      
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader className="gap-5">
            <DialogTitle>Enter Your Resume Title</DialogTitle>
            <DialogDescription>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex. Front-end Resume"
              />
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setOpenDialog(false)} variant="ghost">
            Cancel
          </Button>
          <Button disabled={!title} onClick={onCreate}>
            {
              loading? <LoaderCircle className=" animate-spin"/> : "Create"
            }
            {/* Create */}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Add_Resume;
