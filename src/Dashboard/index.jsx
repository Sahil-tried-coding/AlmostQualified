import React from "react";
import Header from "../Custom/Header";
import Add_Resume from "./components/Add_Resume";

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="p-6 md:p-8 lg:px-14">
        <h1 className="mb-4 text-xl font-bold ">Almost Qualified</h1>
        <h3 className="mb-4 font-semibold">The Ultimate Resume Generator With Ai</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Add_Resume/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
