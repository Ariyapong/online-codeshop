import React from "react";
import styles from './header-bar.module.scss';

function HeaderBar() {
  return (
    <div id="header" className={styles.headBarWrap}>
      <div className={styles.topBar}>
        <div className={`${styles.topTitle} font-t-1 font-dy6`}>Choco CRM</div>
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
