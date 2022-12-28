import React from "react";

const Card = (props) => {
  return (
    <div 
    className="card bold"
    id={props.id}
    onClick={props.onClick}
    >
      <img src={props.image} alt=""></img>
      <div>{`${props.name}`}</div>
    </div>
  );
}

export default Card