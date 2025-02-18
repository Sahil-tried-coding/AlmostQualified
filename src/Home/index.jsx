import { PulsatingButton } from "../components/magicui/pulsating-button";
// import RotatingText from '../../src/components/react-bits/Rotating_text'
import { UserButton } from "@clerk/clerk-react";
import React from "react";
import Header from "../Custom/Header";
import { Button } from "../components/ui/button";
import RotatingText from "../components/react-bits/Rotating_text";
import { useNavigate } from "react-router-dom";

function Home() {
  // const navigation = useNavigate()
  return (
    <div className="">
      <Header />
      <div className="w-full">
        <div className="flex w-full flex-col justify-center items-center mt-10 gap-10">
          <h1 className=" text-blue-600 font-bold sm:text-7xl text-3xl animate-bounce p-4 border-2 border-black">
            Almost Qualified ! 
          </h1>
          <h1 className= "flex w-full flex-col sm:flex-row justify-center items-center gap-3 font-bold sm:text-6xl text-3xl">
            <span className="items-left">Build Your</span>
            <RotatingText
              texts={[
                "Ultimate",
                "Impactful",
                "Over-Powered",
                "Cool!",
                "Stand-Out",
              ]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-purple-600  text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
            Resume <span className="text-purple-700">with AI</span>
          </h1>
          {/* <h2 className="">Effortlessly  craft a standout resume with our   AI powered builder</h2> */}
          <a href="/auth/sign-in" className="">
            <PulsatingButton className="w-[200px]">Get Started</PulsatingButton>
            ;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
