import React, { Fragment } from "react";
import styles from "./footer-bar.module.scss";

function FooterBar({ enableFooter }) {
  return (
    <Fragment>
      {enableFooter && (
        <footer className={`${styles.footerSection} font-t-3 custom-t-14`}>
          <div>
            <div>สอบถามข้อมูลเพิ่มเติมติดต่อ </div>
            <div>โทร. 02-331-8344</div>
          </div>
        </footer>
      )}
    </Fragment>
  );
}

export default FooterBar;
