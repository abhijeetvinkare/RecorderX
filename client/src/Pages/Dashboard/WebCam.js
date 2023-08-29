import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./DashboardAll.css";

function WebCam(props) {
  return (
    <div>
      {props.permisssions && (
        <Webcam
          style={{
            width: "100%",
            height: "240px",
            maxWidth: "400px",
            borderRadius: "6px",
            marginTop: "4px",
          }}
          videoConstraints={{ facingMode: "user" }} // Change to 'environment' for rear camera
          mirrored={true}
        />
      )}
    </div>
  );
}

export default WebCam;
