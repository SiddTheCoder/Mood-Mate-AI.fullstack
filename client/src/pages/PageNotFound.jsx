import React from "react";
// import PageNotFoundAnimation from "../assets/404-Page-Not-Found-Animation.json";
import Lottie from "lottie-react";
import PageBacker from "../components/PageBacker";

function PageNotFound() {
  return (
    <div className="h-screen w-screen flex bg-black/30">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <span className="w-full flex items-center justify-evenly relative">
          <PageBacker />
        </span>
        <span className="text-4xl">
          Oops Page Not Found !{" "}
          <a href="/" className="text-2xl hover:underline text-blue-600">
            Please Go to Home
          </a>{" "}
        </span>
        {/* <Lottie
          animationData={PageNotFoundAnimation}
          loop={true}
          className=""
        /> */}
      </div>
    </div>
  );
}

export default PageNotFound;
