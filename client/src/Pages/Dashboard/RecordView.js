import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import StopIcon from '@mui/icons-material/Stop';

function RecordView() {
  const [userOption, setUserOption] = useState("");
  const [recordedMediaBlobUrl, setRecordedMediaBlobUrl] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const videoRecorder = useReactMediaRecorder({ video: true });
  const screenRecorder = useReactMediaRecorder({ screen: true });

  const startRecordingVideo = () => {
    setUserOption("video");
    videoRecorder.startRecording();
  };

  const startRecordingScreen = () => {
    setUserOption("screen");
    screenRecorder.startRecording();
  };

  const stopRecording = () => {
    if (userOption === "video") {
      videoRecorder.stopRecording();
      setRecordedMediaBlobUrl(videoRecorder.mediaBlobUrl);
    } else if (userOption === "screen") {
      screenRecorder.stopRecording();
      setRecordedMediaBlobUrl(screenRecorder.mediaBlobUrl);
    }
    setIsPopupOpen(true);
  };

  const status =
    userOption === "video"
      ? videoRecorder.status
      : userOption === "screen"
      ? screenRecorder.status
      : "idle";

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  
  return (
    <div className="btn-start-stop-rec-div">
      {status === "idle" || status === "stopped" ? (
        <>
          <button className="btn-start-stop-rec" onClick={startRecordingVideo}>
           <span>Start Video Recording</span>
           <PlayArrowIcon fontSize="large" sx={{ml:-1.2}} />
          </button>
          <span className="or-span">or</span>
          <button className="btn-start-stop-rec" onClick={startRecordingScreen}>
           <span>Start Screen Recording</span> 
           <PlayArrowIcon fontSize="large" sx={{ml:-1.2}} />
          </button>
        </>
      ) : (
        <>
          <button className="btn-start-stop-rec" onClick={stopRecording}>
            <span>Stop Recording</span> 
            < StopIcon fontSize="large" />
          </button>
        </>
      )}

      {isPopupOpen && (
        <Popup
          open={isPopupOpen}
          onClose={closePopup}
          modal
          closeOnDocumentClick
          margin={"10px"}
        >
          <div className="modal-content">
            <button className="popup-btn">
              <a className="download-href" href={recordedMediaBlobUrl} download="recorded_video.mp4">
                Download Recorded Video
              </a>
              <DownloadIcon sx={{ml:1}}/>
            </button>
            <button className="popup-btn btn-close" onClick={closePopup}>
              <span>Close</span>
              <CloseIcon sx={{ml:1}}/>
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default RecordView;
