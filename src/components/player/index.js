import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faBackward,
  faForward,
  faPauseCircle
} from "@fortawesome/free-solid-svg-icons";
import { previousSong, nextSong, playPlayback, pausePlayback } from "../../utils/apiCalls";
import { useStateValue } from "../../state";

const Player = props => {
  const { state } = useStateValue();
  const onPreviousClick = () => {
    previousSong(state.credentials.accessToken);
  };

  const onNextClick = () => {
    nextSong(state.credentials.accessToken);
  };

  const onPlayClick = () => {
    playPlayback(state.credentials.accessToken);
  };

  const onPauseClick = () => {
    pausePlayback(state.credentials.accessToken);
  };
  return (
    <div className="player">
      <div className="albumart"></div>
      <div className="controls">
        <FontAwesomeIcon
          icon={faBackward}
          className="small"
          onClick={onPreviousClick}
        />
        {props.isPlaying ? (
          <FontAwesomeIcon icon={faPauseCircle} onClick={onPauseClick}/>
        ) : (
          <FontAwesomeIcon icon={faPlayCircle} onClick={onPlayClick}/>
        )}
        <FontAwesomeIcon
          icon={faForward}
          className="small"
          onClick={onNextClick}
        />
      </div>
    </div>
  );
};

export default Player;
