import React from "react";
import styles from "./header-bar.module.scss";

function HeaderBar(props) {
  return (
    <div id="header" className={styles.headBarWrap}>
      <div className={styles.topBar}>
        {!props.titleImg && (
          <div className={`${styles.topTitle} font-t-1 font-dy6`}>
            {props.customTitle ? props.customTitle : "Choco CRM"}
          </div>
        )}
        {props.titleImg && (
          <div className={`${styles.topTitle} font-t-1 font-dy6`}>
            <img className={`h100p block ${styles.titleImgSize}`} src={props.titleImg} alt="" />
          </div>
        )}
      </div>
      {/* <div className="top-detail-rewardlist">
        <strong className="username-rewarndlist font-t-2 font-z-2">
          <span className="">{props.customerName}</span>
        </strong>
        <div className="privilege-rewardlist font-t-3 custom-t-14">
          {props.wordExplain}
        </div>
      </div> */}
    </div>
  );
}

export default HeaderBar;
