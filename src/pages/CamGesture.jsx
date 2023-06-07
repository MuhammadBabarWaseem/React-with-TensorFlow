import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function CamGesture() {

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      // const MODEL_URL = process.env.PUBLIC_URL + '/models';
      const MODEL_URL = '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
      ]).then(setModelsLoaded(true));
    }
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  }

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();



        const resizedDetections = faceapi.resizeResults(detections, displaySize);


        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        resizedDetections.forEach(result => {
          const { age, gender, genderProbability } = result;
          new faceapi.draw.DrawTextField(
            [
              `${Math.round(age)} years`,
              `${gender} (${Math.round(genderProbability * 100)}%)`
            ],
            { x: result.detection.box.bottomLeft.x, y: result.detection.box.bottomLeft.y + 20 }
          ).draw(canvasRef.current)
        });

      }
    }, 100)
  }

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button type="button" onClick={closeWebcam} className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-gradient-to-br from-[#9dedf0] via-[#5ce1e6] to-[#33bbcf] rounded-[10px] hover:shadow-woke transition-shadow duration-300 outline-none undefined">Close Webcam</button>
            :
            <button type="button" onClick={startVideo} className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-gradient-to-br from-[#9dedf0] via-[#5ce1e6] to-[#33bbcf] rounded-[10px] hover:shadow-woke transition-shadow duration-300 outline-none undefined">Open Webcam</button>
        }
      </div>
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
    </div>

  )
}
