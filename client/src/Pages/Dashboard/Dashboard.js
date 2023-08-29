import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import RecordView from "./RecordView";
import WebCam from "./WebCam";
import "./DashboardAll.css";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { lightGreen } from "@mui/material/colors";

function Dashboard() {
  let navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [username, setUsername] = useState("");

  const handleStartCamera = () => {
    setIsCameraOn(true);
  };

  const handleStopCamera = () => {
    setIsCameraOn(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/users/dashboard", {
          method: "POST",
          credentials: "include", // This sends cookies with the request
        });

        if (!response.ok) {
          throw new Error("Authorization Failed!");
        }

        const data = await response.json(); // Parse the response JSON
        setUsername(data.name); // Store the username in the state
      } catch (error) {
        alert(error.message);
        navigate("/"); // Redirect to the desired route
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="webcam-container">
          <div className="webcam-screen">
            <div className="webcam-username-div">
              <h1>{username}</h1>
            </div>
            <div className="webcam-stream-div">
              <WebCam permisssions={isCameraOn} />
            </div>
          </div>
          <div className="webcam-on-off-btn-div">
            {isCameraOn ? (
              <button className="cam-on-off-btn" onClick={handleStopCamera}>
                <VideocamIcon sx={{ color: lightGreen[50], fontSize: 30  }}/>
              </button>
            ) : (
              <button className="cam-on-off-btn" onClick={handleStartCamera}>
                <VideocamOffIcon sx={{ color: lightGreen[50], fontSize: 30  }}/>
              </button>
            )}
          </div>
        </div>
        <div>
          <RecordView />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
