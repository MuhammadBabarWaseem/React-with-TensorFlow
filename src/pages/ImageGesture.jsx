import { useEffect, useRef } from "react";
import image2 from '../Image/Image2.jpg'
import * as faceapi from "face-api.js";
import './PageStyle.css'

const ImageGesture = () => {

  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);

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
  };


  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models")
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };

    imgRef.current && loadModels();
  }, []);

  return (
    <div className="App grid h-screen place-items-center mt-4">
      <img
        ref={imgRef}
        src={image2}
        alt="Detect The Facial Expression"
        width="940"
        height="650"
      />
      <canvas ref={canvasRef} className="canvas" width="940" height="650" />
    </div>
  )
}

export default ImageGesture
