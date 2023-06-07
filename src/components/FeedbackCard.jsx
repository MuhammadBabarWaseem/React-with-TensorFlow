import { Link } from "react-router-dom";
import { quotes } from "../assets";


const FeedbackCard = () => (

  <>
  <Link to="/image" className="flex justify-between cursor-pointer flex-col px-10 py-12 rounded-[20px]  max-w-[270px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    <img src={quotes} alt="double_quotes" className="w-[42.6px] h-[27.6px] object-contain" />
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">
      It will detect the gesture, age and gender of an already added image
    </p>
    <div className="flex flex-row">
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
          Gesture Of An Image
        </h4>
      </div>
    </div>
  </Link>

  <Link to="/uploadimage" className="flex justify-between cursor-pointer flex-col px-10 py-12 rounded-[20px]  max-w-[270px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    <img src={quotes} alt="double_quotes" className="w-[42.6px] h-[27.6px] object-contain" />
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">
    It will detect the gesture, age and gender of an image that you will be upload.
    </p>
    <div className="flex flex-row">
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
          Gesture Of An Uploaded Image
        </h4>
      </div>
    </div>
  </Link>


  <Link to="/camGesture" className="flex justify-between cursor-pointer flex-col px-10 py-12 rounded-[20px]  max-w-[270px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    <img src={quotes} alt="double_quotes" className="w-[42.6px] h-[27.6px] object-contain" />
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">
    It will detect the gesture, age and gender from the user's webcam or facecam.
    </p>
    <div className="flex flex-row">
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
          Using FaceCam
        </h4>
      </div>
    </div>
  </Link>

  <Link to="/objectDetection" className="flex justify-between cursor-pointer flex-col px-10 py-12 rounded-[20px]  max-w-[270px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    <img src={quotes} alt="double_quotes" className="w-[42.6px] h-[27.6px] object-contain" />
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">
    It will detect the object that can be identified by the pre-trained model, and it also gives the accuracy level and some other observation as well.
    </p>
    <div className="flex flex-row">
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
          Object Detection
        </h4>
      </div>
    </div>
  </Link>

  
  </>
);


export default FeedbackCard;
