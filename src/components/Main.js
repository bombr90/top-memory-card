import React, {useState, useEffect} from "react";
import uniqid from "uniqid";
import Scoreboard from './Scoreboard/Scoreboard'
import CardsGrid from './CardsGrid/CardsGrid'
import sprites from './CardsGrid/sprites'


const Main = (props) => {
  const [scoreBoard, setScoreBoard] = useState({
    currentScore: 0,
    currentLevelScore: 0,
    highscore: 0,
    level: 1,
    uid: uniqid(),
  });

  useEffect(() => {
    if (scoreBoard.currentLevelScore === scoreBoard.level * 2) {
      levelIncrement();
    } else {
      setCardsGrid((prev) => ({ ...prev, cards: shuffle(prev.cards) }));
    }
  }, [scoreBoard.currentLevelScore]);

  useEffect(() => {
    if (scoreBoard.level === 1) return;
    if (scoreBoard.level <= 5) {
      alert(
        `You've completed level: ${
          scoreBoard.level - 1
        }. Next round you'll have to clear ${scoreBoard.level * 2} cards.`
      );
    } else {
      alert(
        `You've completed the max difficulty, keep on clicking to see how high a score you can get!`
      );
    }
  }, [scoreBoard.level]);

  const [cardsGrid, setCardsGrid] = useState({
    cards: [],
    uid: uniqid(),
  });

  useEffect(() => {
    if (
      cardsGrid.cards.every((card) => {
        return card.prevClicked === true;
      })
    ) {
      newCardGrid(scoreBoard.level);
    }
  }, [cardsGrid.cards]);

  //////////////////////////////////////
  ///Scoreboard Callbacks///////////////
  //////////////////////////////////////
  const scoreReset = () => {
    setScoreBoard((prev) => {
      return prev.currentScore > prev.highscore
        ? { ...prev, highscore: prev.currentScore, currentScore: 0 }
        : { ...prev, currentScore: 0 };
    });
  };

  const scoreIncrement = () => {
    setScoreBoard((prev) => {
      return {
        ...prev,
        currentScore: prev.currentScore + 1,
        currentLevelScore: prev.currentLevelScore + 1,
      };
    });
  };

  const levelIncrement = () => {
    setScoreBoard((prev) => {
      if (prev.level + 1 > 5 && prev.currentLevelScore !== 0) {
        alert(
          `You've completed the max difficulty, keep on clicking to see how high a score you can get!`
        );
      }
      return prev.level + 1 < 6
        ? { ...prev, level: prev.level + 1, currentLevelScore: 0 }
        : { ...prev, level: 5, currentLevelScore: 0 };
    });
    newCardGrid();
  };

  const levelReset = () => {
    setScoreBoard((prev) => {
      return {
        ...prev,
        level: 1,
        currentLevelScore: 0,
      };
    });
  };

  //////////////////////////////////////
  ///Cardsgrid Callbacks////////////////
  //////////////////////////////////////
  const handleCardClick = (event) => {
    const uid = event.target.parentElement.id;
    const index = cardsGrid.cards.findIndex((el) => el.uid === uid);
    const entry = JSON.parse(JSON.stringify(cardsGrid.cards[index]));

    if (entry.prevClicked === false) {
      updatePrevClicked(entry, index);
      scoreIncrement();
    } else {
      alert(`Good game, you scored: ${scoreBoard.currentScore} this round.`);
      levelReset();
      scoreReset();
      resetCardGrid();
    }
  };

  const newCardGrid = (level) => {
    const selectedSprites = randomSelection(sprites, level * 2);
    selectedSprites.forEach((el) => {
      el.prevClicked = false;
      el.uid = uniqid();
    });
    setCardsGrid((prev) => ({ ...prev, cards: selectedSprites }));
  };

  const updatePrevClicked = (entry, index) => {
    setCardsGrid((prev) => {
      entry.prevClicked = true;
      const updatedCards = prev.cards;
      updatedCards[index] = entry;
      return { ...prev, cards: updatedCards };
    });
  };

  const resetCardGrid = () => {
    setCardsGrid((prev) => {
      return { ...prev, cards: [] };
    });
  };

  //////////////////////////////////////
  ///Helper Functions///////////////////
  //////////////////////////////////////

  function randomSelection(arr, n) {
    if (n > arr.length) {
      return arr;
    }
    const newArr = [];
    const copyArr = JSON.parse(JSON.stringify(arr));
    for (let i = 0; i < n; i++) {
      const obj = copyArr.splice(Math.floor(Math.random() * copyArr.length), 1);
      newArr.push(...obj);
    }
    return newArr;
  }

  function shuffle(arr) {
    const newArr = randomSelection(arr, arr.length);
    return newArr;
  }

  //////////////////////////////////////
  ///Return (render) ///////////////////
  //////////////////////////////////////

  return (
    <div id="main">
      <div id="instructions">{`Instructions\n Click on a unique card to begin. After successfully clicking on a unique card, the current deck will be shuffled. Once each card in the current 'deck' have been clicked you'll move onto the next level. A new, larger deck will be dealt (up to ten cards at level five) and you will repeat the process of selecting each unique card once. Selecting the same card twice in the current card deck will end the game.`}</div>
      <Scoreboard
        scoreBoard={scoreBoard}
        onClick={handleCardClick}
        key={scoreBoard.uid}
      />
      <CardsGrid
        cards={cardsGrid.cards}
        onCardClick={handleCardClick}
        key={cardsGrid.uid}
      />
    </div>
  );
}

export default Main;
