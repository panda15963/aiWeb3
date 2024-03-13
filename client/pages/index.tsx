import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import ToolsOnMain from "./components/generationTools/toolsOnMain";
import EthereumChart from "./components/ethereumAPI/EthereumApi";

// Defining the main Index component
export default function Index() {
  return (
    <div className="bg-white">
      {/* Rendering the Navbar component */}
      <Navbar />
      {/* Rendering the ToolsOnMain component */} 
      <div className="col-12 pb-4 mx-auto">
        <EthereumChart />
      </div>
      <div className="col-12 pb-4 mx-auto">
        <h1 className="text-center text-4xl font-bold mt-8 pb-4">
          Choose your tool
        </h1>
        <ToolsOnMain />
      </div>
      {/* Rendering the Footer component */}
      <Footer />
    </div>
  );
}
