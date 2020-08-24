import React from "react";
// import styles from "./accordion-styles.module.scss";
import "./accordion-styles.css";
// import { textData, termCondition } from "../../assets/mock-data/mock-data";

function Accordion(props) {
  return (
    // <div className={styles.accordionSection}>
    <div className="accordionSection">
      {/* input-radio-section */}
      <input
        id={props.idControl}
        type="checkbox"
        className="collape-item collape-check font-t-3 font-z-2 hide"
        name="term-condition"
        value="1"
        onChange={props.handleExpandClick}
      />
      {/* input-radio-section */}
      {/* <div className={`${styles.tabDisplay}`} value="1"> */}
      <div id="displayterm" className="tabDisplay tabHeight" value="1">
        {/* {props.content} */}
        <div
          
          className="font-t-3 custom-t-14"
          dangerouslySetInnerHTML={{
            // __html: termCondition,
            __html: props.termCon,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Accordion;
