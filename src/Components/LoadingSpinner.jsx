
import loadingAnimation from "../assets/loading_animation.json"
import Lottie from "lottie-react";
const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center '>
  

       <Lottie animationData={loadingAnimation} loop={true} />




    </div>
  );
};

export default LoadingSpinner;