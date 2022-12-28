import React from "react";

const Scoreboard = (props) => {
  
  return (
    <div id="scoreboard" className="bold">
      <span>
        <div>Current Level: </div>
        <div>{props.scoreBoard.level}</div>
      </span>
      <span>
        <div>Current Score: </div>
        <div>{props.scoreBoard.currentScore}</div>
      </span>
      <span>
        <div>High Score: </div>
        <div>{props.scoreBoard.highscore}</div>
      </span>
    </div>
  );
}

export default Scoreboard