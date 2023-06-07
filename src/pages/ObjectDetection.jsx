import React, { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
// import './style.scss'

function ObjectDetection() {

  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  };

  const uploadTrigger = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
    setResults([]);
  };

  const loadModel = async () => {

    try {
      const model = await mobilenet.load();
      // console.error(model)
      setModel(model);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadModel()
  }, []);

  const detectImage = async () => {
    // textInputRef.current.value = "";
    if (!model) return alert('Issue In Model')
    const results = await model.classify(imageRef.current);
    setResults(results);

  };


  return (
    <div>
      <div className="inputField">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          ref={fileInputRef}
          className="uploadInput"
          onChange={uploadImage}
        />
        <button className="uploadImage" onClick={uploadTrigger}>
          Upload Image
        </button>
        <span className="or">OR</span>
        <input
          type="text"
          placeholder="Enter Image URL"
          ref={textInputRef}
          onChange={handleInputChange}
        />
      </div>

      <div className="imageWrapper">
        <div className="imageContent">
          <div className="imageArea">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Img Preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>

          {results.length > 0 && (
            <div className="imageResult">
              {results.map((result, index) => {
                return (
                  <div className="result" key={result.className}>
                    <span className="name">{result.className}</span>
                    <span className="accuracy">
                      Accuracy Level : {(result.probability * 100).toFixed(2)}% {" "}
                      {index === 0 && (
                        <span className="bestGuess">Best Guess</span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

        </div>

        {imageUrl && (
          <button className="button" onClick={detectImage}>
            Detect Image
          </button>
        )}
      </div>
    </div>
  )
}

export default ObjectDetection
