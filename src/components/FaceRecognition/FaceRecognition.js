import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ boxes, imageURL }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {!imageURL.length ? (
          <p />
        ) : (
          <img
            id="inputImage"
            alt={"Input"}
            src={imageURL}
            width={"500px"}
            height="auto"
          />
        )}
        {boxes.map((box, i) => {
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;