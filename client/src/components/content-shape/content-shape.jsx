import React from "react";
import styles from "./content-shape.module.scss";
// import SubjectDetail from "../subject-detail/subject-detail";

// import lotus from "../../assets/images/images/Tesco-Lotus.png";
// import buck from "../../assets/images/images/Starbuck.png";
// import lotusPhy from "../../assets/images/images/Tesco-Lotus-Card.png";
import lockFrame from "../../assets/images/gyproc-56.png";

function ContentShape(props) {
  return (
    <div className={styles.contentShapSection}>
      <div className={styles.shapeWrap}>
        {/* <SubjectDetail
          customerName={props.customerName}
          details={props.description}
        /> */}
        {/* {props.rewardDetail} */}
        <div className={`${styles.rewardContent} font-t-1 font-z-1`}>
          <div className={`${styles.rewardContentWrap}`}>
            {props.detail && (
              <div className={`${styles.frameImg}`}>
                <div
                  className={`${styles.displayImg}`}
                  style={{
                    backgroundImage: `url(${props.detail.CoverImage})`,
                  }}
                ></div>
                <img
                  src={lockFrame}
                  className="img-width elem-block fake-hide"
                  alt=""
                />
              </div>
            )}

            <div className={`${styles.frameDetail}`}>
              {props.detail && (
                <>
                  <div className="font-t-2 font-dy2  kaBrownText">
                    <b>{props.detail.NameTh}</b>
                  </div>
                  <div className="font-t-2 font-dy0  kaBrownText">
                    {props.detail.SubNameTh}
                  </div>
                  <div className="font-t-2 font-dy2  kaBrownText">
                    {props.detail.DetailTh}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentShape;
