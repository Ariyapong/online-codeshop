import React from "react";
import "./page-layout.css";
//component
import HeaderBar from "../components/header-bar/header-bar";
import Footer from "../components/footer-bar/footer-bar";
import titleImg from '../assets/images/Logo-choco-w-350px.png'

function PageLayout(props) {
  const customBGImage = props.customBG
    ? {
        backgroundImage: `url(${props.customBG})`,
      }
    : null;

  return (
    <div id="page-layout" className="setBGColrSVG">
      <div className={`page-bg ${props.bgType}`} id="bg" style={customBGImage}></div>
      <div className="content-group bg-main" style={{ height: props.style }}>
        <div className="content-bg">
          {props.customerShow && <HeaderBar titleImg={titleImg} />}
          <div className="content-section">{props.children}</div>
        </div>
      </div>
      <Footer enableFooter={props.enableFooter} />
      {/* <KrungsriImg showImgFooter={props.showImgFooter} imgBottom2={props.imgBottom2} /> */}
    </div>
  );
}
export default PageLayout;
