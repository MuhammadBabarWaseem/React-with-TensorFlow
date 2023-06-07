import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import './PageStyle.css'

export default function UploadImageGesture() {

  const imgRef = useRef();
  const canvasRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(true);

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);

    faceapi.matchDimensions(canvasRef.current, {
      width: 940,
      height: 650,
    })

    const resized = faceapi.resizeResults(detections, {
      width: 940,
      height: 650,
    })

    faceapi.draw.drawDetections(canvasRef.current, resized)
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)

    resized.forEach(result => {
      const { age, gender, genderProbability } = result;
      new faceapi.draw.DrawTextField(
        [
          `${Math.round(age)} years`,
          `${gender} (${Math.round(genderProbability * 100)}%)`
        ],
        { x: result.detection.box.bottomLeft.x, y: result.detection.box.bottomLeft.y + 20 }
      ).draw(canvasRef.current)
    });

    // Hide the input field
    setShowInput(false);
  };

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models")
      ])
        .catch((e) => console.log(e));
    };

    loadModels();
  }, []);

  const handleInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    if (selectedImage) {
      imgRef.current.src = selectedImage;
      handleImage();
    }
  }, [selectedImage]);

  return (
    <div className="App grid h-screen place-items-center mt-4">
      {showInput && (
        <div>
          <label htmlFor="imageUpload" className="block mb-2 font-medium text-gray-700">
            Select an image file:
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleInputChange}
            className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-4"
          />
        </div>
      )}
      {selectedImage && (
        <img
          ref={imgRef}
          src={selectedImage}
          alt="Detect The Facial Expression"
          width="940"
          height="650"
        />
      )}
      <canvas ref={canvasRef} className="canvas" width="940" height="650" />
    </div>
  )
}
