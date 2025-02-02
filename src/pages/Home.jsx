import React from "react";
import bg from  '../assets/bg-img.jpg'

const Home = () => {
  return(
     <>
     <div className="relative">
      <img src={bg} alt="bg-img" className="w-screen h-screen"/>
      <h4 className="text-4xl font-bold absolute top-40 left-[40%]">Welcome User!!</h4>

     </div>
   

  
  </>);
};

export default Home;
