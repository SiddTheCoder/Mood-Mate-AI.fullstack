import React from "react";
import Lottie from "lottie-react";
// import CompanyLogo from "../assets/animated-logo-cart.json";
import Logo from "../assets/e18e014e-98af-4f3d-b93d-9113c64c4aff.jpeg"; // Adjust the path as necessary
function LoaderModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[10%] max-w-md flex flex-col items-center gap-4">
        {/* <Lottie animationData={CompanyLogo} loop={true} className="w-18 h-18" /> */}
        <img src={Logo} alt="" width={80} />
      </div>
    </div>
  );
}

export default LoaderModal;
