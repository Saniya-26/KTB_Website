import React from "react";
import "../styles/memory.css";
import cover from "../assets/images/MemGame/cover.png";
const Memcard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          className="back"
          src={cover}
          alt="card-back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Memcard;
