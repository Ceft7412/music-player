import { useContext, useRef, useEffect, useState } from "react";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

// mui styling

import { styled } from "@mui/system";

import { RootContext } from "@/context/RootContext";

const StyledPlayCircleFilledWhiteOutlinedIcon = styled(PlayCircleFilledWhiteOutlinedIcon)(
  {
    fontSize: 45,
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
      fontSize: 48,
    },
    width: 50,
  }
);

const StyledPauseCircleOutlineRoundedIcon = styled(PauseCircleOutlineRoundedIcon)({
  fontSize: 45,
  cursor: "pointer",
  transition: "0.2s",
  "&:hover": {
    fontSize: 48,
  },
  width: 50,
});
const StyledSkipNextIcon = styled(SkipNextIcon)({
  fontSize: 45,
  cursor: "pointer",
  color: "gray",
  transition: "0.2s",
  "&:hover": {
    color: "white",
  },
  width: 50,
});

const StyledSkipPreviousIcon = styled(SkipPreviousIcon)({
  fontSize: 45,
  cursor: "pointer",
  color: "gray",
  transition: "0.2s",
  "&:hover": {
    color: "white",
  },
  width: 50,
});
export default function Footer() {
  const audioRef = useRef(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [isNoVolume, setNoVolume] = useState(true);
  const {
    isPlaying,
    setIsPlaying,
    setModalUpload,
    modalUpload,
    storedFiles,
    backgroundClickedItem,
    setBackgroundClickedItem,
    itemToPlay,
    setVolume,
    volume,
  } = useContext(RootContext);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);

    // If seconds is less than 10, add a leading 0
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  const totalSeconds = minutes * 60 + seconds;

  useEffect(() => {
    if (Math.floor(currentTime) === totalSeconds) {
      setIsPlaying(false);
    }
  }, [currentTime]);
  useEffect(() => {
    if (itemToPlay && audioRef.current) {
      const blob = new Blob([itemToPlay.content], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      audioRef.current.src = url;

      setMinutes(itemToPlay.duration.minutes);
      setSeconds(itemToPlay.duration.seconds);

      // Set the ontimeupdate event listener here
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      // Play the audio and set isPlaying to true

      if (isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [itemToPlay]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSliderChange = (event, newValue) => {
    setCurrentTime(newValue);
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
    }
  };

  const handleVolumeChange = (event, newValue) => {
    console.log(newValue);
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  const handleNoVolume = () => {
    setNoVolume(!isNoVolume);
    if (audioRef.current) {
      if (isNoVolume) {
        setVolume(0);
        audioRef.current.volume = 0;
      } else {
        setVolume(100);
        setNoVolume(!isNoVolume);
        audioRef.current.volume = 100 / 100;
      }
    }
  };

  return (
    <>
      <div className="footer">
        <div className="footer__flex">
          <div className="footer__flex-cols">
            <div className="footer__flex-rows-icons">
              <StyledSkipPreviousIcon />

              <div className="" onClick={togglePlayPause}>
                {isPlaying ? (
                  <StyledPauseCircleOutlineRoundedIcon />
                ) : (
                  <StyledPlayCircleFilledWhiteOutlinedIcon />
                )}
              </div>
              <StyledSkipNextIcon />
            </div>
            <div className="footer__progress">
              <span className="footer__progress-duration">{formatTime(currentTime)}</span>
              <Slider
                color="inherit"
                aria-label="time-indicator"
                value={currentTime}
                max={totalSeconds}
                onChange={handleSliderChange}
                sx={{
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,

                    "&.Mui-active": {
                      width: 8,
                      height: 8,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
              <span className="footer__progress-duration">
                {formatTime(totalSeconds)}
              </span>
              <audio
                ref={audioRef}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
              />
            </div>
            <div className="footer__volume">
              <div className="volume__icons" onClick={handleNoVolume}>
                {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </div>
              <Slider
                color="inherit"
                sx={{
                  height: "5",
                  "& .MuiSlider-thumb": {
                    width: 10,
                    height: 10,

                    "&.Mui-active": {
                      width: 8,
                      height: 8,
                    },
                  },
                }}
                aria-label="Volume"
                onChange={handleVolumeChange}
                value={volume}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
