import React, { useContext, useState, useEffect } from "react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { ResumeContext } from "../../../../../Context/ResumeContext";
import { useParams } from "react-router-dom";
import GlobalAPI from "../../../../../../Service/GlobalAPI";

function Projects() {
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

  const [projectList, setProjectList] = useState([
    {
      projectName: "",
      liveLink: "",
      githubLink: "",
      techStack: "",
      description: "",
    },
  ]);

  const params = useParams();

  useEffect(() => {
    if (
      resumeInfo?.projects &&
      Array.isArray(resumeInfo?.projects) &&
      resumeInfo?.projects.length > 0
    ) {
      setProjectList(resumeInfo?.projects);
    } else {
      setProjectList([
        {
          projectName: "",
          liveLink: "",
          githubLink: "",
          techStack: "",
          description: "",
        },
      ]);
    }
  }, []);


  useEffect(()=>{
    setResumeInfo((prev) => ({ ...prev, projects: projectList }));
  },[projectList])

  const addProjects = () => {
    setProjectList([
      ...projectList,
      {
        projectName: "",
        liveLink: "",
        githubLink: "",
        techStack: "",
        description: "",
      },
    ]);
  };

  const removeProjects = () => {
    setProjectList((remove) => remove.slice(0, -1));
  };




  const getProjectInfo = async () =>{
    try {
      const userData = await GlobalAPI.GetProjectComponent(params?.resume_id)
          // const userData = await GlobalAPI.GetEducationComponent(params?.resume_id);
          console.log("the education component is this ---->", userData.data?.data);
          // If the fetched data has an experience array, update local state.
          if (
            userData.data?.data?.projects &&
            Array.isArray(userData.data.data.projects)
          ) {
            setProjectList(userData.data.data.projects);
          } else {
            setProjectList([{
              projectName: "",
          liveLink: "",
          githubLink: "",
          techStack: "",
          description: "",
            }]);
          }
          console.log("Fetched experience:", userData.data?.data?.education);
        } catch (error) {
          console.error("Error fetching experience:", error);
          setProjectList([{projectName: "",
            liveLink: "",
            githubLink: "",
            techStack: "",
            description: "",}]);
        }
  }

  useEffect(()=>{
    getProjectInfo()
  },[params?.resume_id])
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const data = {
      data: {
        projects: projectList.map(({ id, ...rest }) => rest),
      },
    };



    setResumeInfo((prev) => ({ ...prev, projects: projectList }));
    try {

      const resp = await GlobalAPI.UpdateFormData(params?.resume_id, data);

      if (resp?.data) {
        console.log("projects upload done");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (event, index) => {
    const newEntire = [...projectList];

    const { name, value } = event.target;

    newEntire[index][name] = value;

    setProjectList(newEntire);
  };

  return (
    <div>
      {
       resumeInfo?.fieldRequired?.Project ? <div className="p-5 border-t-purple-600 rounded-lg shadow-lg border-t-8">
        <h1 className="font-bold text-lg text-center mb-2">Projects</h1>
        {/* <p className="font-semibold text-sm">
          Add your Projects which makes impact{" "}
        </p> */}
  
        <div className="">
          {/* <Button
            onClick={addProjects}
            variant="outline"
            className="text-purple-600 my-3"
          >
            + Add  Project
          </Button> */}
          {projectList.map((item, index) => (
            <div key={index} className="grid grid-cols-2 border p-3 gap-3">
              <label className=" col-span-2">
                Project Title
                <Input
                required
                  defaultValue={item.projectName || ""}
                  index={index}
                  onChange={(event) => handleChange(event, index)}
                  name="projectName"
                />
              </label>
              <label>
                Live Link
                <Input
                  defaultValue={item.liveLink || ""}
                  index={index}
                  onChange={(event) => handleChange(event, index)}
                  name="liveLink"
                />
              </label>
              <label>
                Github Link
                <Input
                  defaultValue={item.githubLink || ""}
                  index={index}
                  onChange={(event) => handleChange(event, index)}
                  name="githubLink"
                />
              </label>
              <label className="col-span-2">
                Tech Stack
                <Input
                  defaultValue={item.techStack || ""}
                  index={index}
                  onChange={(event) => handleChange(event, index)}
                  name="techStack"
                  placeholder="comma seprated value"
                />
              </label>
              <label className="col-span-2">
                Description
                <Textarea
                  defaultValue={item.description || ""}
                  index={index}
                  onChange={(event) => handleChange(event, index)}
                  name="description"
                />
              </label>
            </div>
          ))}
          <div className="flex justify-between w-full my-3">
            <div className="gap-5 flex">
              <Button
                onClick={addProjects}
                variant="outline"
                className="text-purple-600"
              >
                + Add Projects
              </Button>
              <Button
                onClick={removeProjects}
                variant="outline"
                className="text-purple-600"
              >
                Remove
              </Button>
            </div>
            <Button onClick={onSave}>
              {loading ? <LoaderCircleIcon className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>:<div className="flex  items-center">
        <div className="font-semibold justify-center mt-32 items-center">You havent Selected <span className="text-purple-600">Project</span> Field Click Next or Go back and select <span className="text-purple-600">Project</span> Field</div>
        </div>
      }
    </div>
  );
}

export default Projects;
