import React, { useState, useEffect } from "react";
import styles from "./navigate.module.scss";
import './styles-svg.css';

//img
import { ReactComponent as Next } from "../../assets/images/svg/ka-icon-next1.svg";
import { ReactComponent as Prev } from "../../assets/images/svg/ka-icon-prev1.svg";

// import NextBTN from "../../assets/images/images/nxt.png";
// import PrevBTN from "../../assets/images/images/prev.png";

function NavigateBTN({
  action,
  codesIndex,
  customStyles,
  handleClickNavigateChange,
  codesLenght,
}) {
  if (action === "prev")
    return (
      <button
        className={`${styles.itemProcess} ${styles.animateBtnPrev} ${styles.animateProps}`}
        style={customStyles}
        onClick={() =>
          handleClickNavigateChange("prev", codesIndex, codesLenght)
        }
        // disabled
      >
        <Prev className={`${styles.iconBtn}`} />
        {/* <img src={PrevBTN} className="img-width elem-block" alt="" /> */}
      </button>
    );
  else if (action === "nxt")
    return (
      <button
        className={`${styles.itemProcess} ${styles.animateBtnNext} ${styles.animateProps}`}
        style={customStyles}
        onClick={() =>
          handleClickNavigateChange("nxt", codesIndex, codesLenght)
        }
        
      >
        <Next className={`${styles.iconBtn}`} />
        {/* <img src={NextBTN} className="img-width elem-block" alt="" /> */}
      </button>
    );
}

export default NavigateBTN;
