import React from "react";
import Card from './Card'

const CardsGrid = (props) => {
  return (
    <div id="cardsgrid">
      {props.cards.map((el) => {
        return (
          <Card
            image={el.image}
            name={el.name}
            prevClicked={el.prevClicked}
            id={el.uid}
            key={el.uid}
            onClick={props.onCardClick}
          />
        );
      })}
    </div>
  );
}

export default CardsGrid