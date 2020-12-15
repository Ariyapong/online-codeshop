import React, { useEffect, useState } from "react";
/**styles */
import styles from "./reward-details.module.scss";
/**styles */
/**depandencies */
// import Axios from "axios";
import Axios from "../../../helpers/API/my-axios";
import AxiosOri from "axios";
import bwipjs from "bwip-js";
import { QRCode } from "react-qr-svg";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import LoadingScreen from 'react-loading-screen';

/**depandencies */
/**components */
import NavigateBTN from "../../../components/navigate-btn/navigate-btn";
import ContentShape from "../../../components/content-shape/content-shape";
import Accordion from "../../../components/accordion/accordion";
// import CustomPopup from "../../../components/CustomPopup";
// import Popup from "../../../configs/Popup";
import { handleChangeLoading } from "../../../helpers/UtilFunction";
import Loader from "../../../components/Loader";
// import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

/**components */
/**img */
import { ReactComponent as ArrowDown } from "../../../assets/images/svg/angle-down.svg";
import { useHistory, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import queryString from "querystring";

/**img */

let location = window.location.search.slice(1);
// const Myswal = withReactContent(Swal);
function RewardDetails({ setFooter }) {
  const history = useHistory();
  const { param } = useParams();

  const [rewardType] = useState("e-code");
  const [name, setName] = useState("");
  const [telNum, setTelNum] = useState("");
  const [address, setAddress] = useState("");
  const [addressBox, setAddressBox] = useState("");
  const [detail, setDetail] = useState("");
  const [barCodeText, setBarCodeText] = useState("");
  const [displayControl, setDisplayControl] = useState("hide");
  const [codeIndex, setCodeIndex] = useState("");
  const [codesLenght, setCodesLenght] = useState(0);
  const [slotDisplayBarcode, setSlotDisplayBarcode] = useState("");
  const [loading, setLoading] = useState(true);

  const customLoadingStyle = {
    backgroundColor: "rgba( 255, 255, 255, 1)",
  };

  //adjust some main layout
  useEffect(() => {
    setFooter(false);
    return () => {
      setFooter(true);
    };
  }, [setFooter]);

  useEffect(() => {
    getParamUrl(param);
  }, []);

  useEffect(() => {
    //if customer have multiple code
    if (codesLenght > 0) {
      document.getElementById("controlFade").classList.add("fade-tab");
      injectCodes("start", slotDisplayBarcode, codeIndex);
    }
  }, [codeIndex]);

  function getParamUrl() {
    let getQueryVar = queryString.parse(location);
    console.log("query param", getQueryVar);

    //bypass flow redeem reward
    redeemReward(getQueryVar);
  }

  //build barcode if user redeem digital reward(type 2)
  function injectCodes(type = "original", eCodeArry, index = 0) {
    if (type !== "original") {
      setBarCodeText(eCodeArry[index].Code);
      // setCodeIndex((state)=> state + 1);
      try {
        // eCodeArry.map((data, index) => {});
        let canvas = bwipjs.toCanvas("mycanvas", {
          bcid: "code128", // Barcode type
          text: eCodeArry[index].Code, // Text to encode
          // text: "1516623664636461156363", // Mock Text to encode
          // scale: 1, // 3x scaling factor
          scaleX: 2,
          scaleY: 2,
          height: 20, // Bar height, in millimeters
          // paddingbottom: 10,
          // includetext: true, // Show human-readable text
          textxalign: "center", // Always good to set this
        });
      } catch (error) {
        console.log("canvas error", error);
      }
    }
  }

  // function findRWItem(getData, rewardId) {
  //   if (getData) {
  //     let { rewards } = getData;
  //     //find reward from list
  //     let rightItem = rewards.find(
  //       (element) => +rewardId === element.Reward.RewardId
  //     );
  //     return rightItem;
  //   }
  // }

  // const ButtonPage = () => {
  //   return (
  //     <MDBBtn
  //       className={`mainColr font-t-1 custom-t-14 ${styles.btnCustom}`}
  //       type="button"
  //       onClick={handleClickConfirm}
  //     >
  //       ยืนยัน
  //     </MDBBtn>
  //   );
  // };

  // function handleClickConfirm() {
  //   let popupParam = {
  //     renderCustomPopup: (
  //       <CustomPopup
  //         subjectText="ยืนยันของรางวัล"
  //         normalText="ท่านยืนยันการรับของรางวัลหรือไม่ ?"
  //         // history={props.history}
  //         btnConfirmText="ยืนยัน"
  //         onClickConfirm={() => redeemReward(detail, addressBox)}
  //         // rewardType={getRewardType}
  //         setPairBtn={true}
  //       />
  //     ),
  //     showConfirmBtn: false,
  //   };
  //   //pop up 1 to confirm user before redeem
  //   Popup(popupParam);

  //   // redeemReward();
  // }

  async function redeemReward(queryValue) {
    handleChangeLoading(true);
    setLoading(true);

    Axios.get(
      `/api/reward/detail?campaign1=${queryValue.campaign1}&campaign2=${queryValue.campaign2}`
    )
      .then((response) => {
        console.log(response);
        let Codes = [];
        let {
          ImageURL,
          Reward_Name,
          Reward_Type,
          Reward_Detail,
          TermCondition,
        } = response.data.rewardDetail;

        let detail = {
          CoverImage: ImageURL,
          NameTh: Reward_Name,
          SubNameTh: Reward_Type,
          DetailTh: Reward_Detail,
          TermsAndCondsTh: TermCondition,
        };

        console.log("ExtraData ===>", response.data.codeData.DisplayType);

        Codes.push(response.data.codeData);
        console.log("Codes model", Codes);
        // setName(address.firstName + " " + address.lastName);
        setDetail(detail);
        // if (Redemption.Codes.length < 2) setDisplayControl("hide");

        setSlotDisplayBarcode(Codes);
        setCodeIndex(0);
        setCodesLenght(0);

        injectCodes("start", Codes, 0);
        handleChangeLoading(false);
        setLoading(false);
      })
      .catch((error) => {
        handleChangeLoading(false);
        setLoading(false);
        console.log(error);
      });

    // let packData = {
    //   citizenId: queryValue.campaign1,
    //   campaign_Ref: queryValue.campaign2,
    // };
    // try {
    //   let response = await AxiosOri.post(
    //     `${process.env.REACT_APP_URL_ENDPOINT}/ka_paycam/api/authen/Auto_RedeemCodeOneReward`,
    //     packData
    //   );

    //   let {
    //     Redemption,
    //     Reward,
    //     address,
    //     // Tracking: { address, ...Tracking },
    //   } = response.data;
    //   handleChangeLoading(false);
    //   setLoading(false);

    //   setName(address.firstName + " " + address.lastName);
    //   setDetail(Reward);
    //   if (Redemption.Codes.length < 2) setDisplayControl("hide");
    //   setSlotDisplayBarcode(Redemption.Codes);
    //   setCodeIndex(0);
    //   setCodesLenght(Redemption.Codes.length);

    //   injectCodes("start", Redemption.Codes, 0);

    //   // history.push("/privilege/reward-track");
    // } catch (error) {
    //   console.log(error);
    //   let detail = {
    //     NameTh: "ไม่พบข้อมูลในระบบ",
    //     SubNameTh: "Link ของท่านไม่ถูกต้อง",
    //     DetailTh: "เพื่อแก้ปัญหาหรือต้องการคำแนะนะ กรุณาติดต่อ Support",
    //    }
    //    window.sessionStorage.setItem("notfound", JSON.stringify(detail));
    //    handleChangeLoading(false);
    //   setLoading(false);
    //   history.push("/invalid-code");
    // }
  }

  function animateArrowSign(checkedStatus) {
    // let checkedStatus = e.target.checked;
    // let inputValue = e.target.value;

    let element = document.querySelectorAll(`.animateArrow`);

    if (checkedStatus) {
      element[0].classList.remove("de-animateelem");
      element[0].classList.add("animateelem");
    } else {
      element[0].classList.remove("animateelem");
      element[0].classList.add("de-animateelem");
    }
  }

  function handleExpandClick(e) {
    let checkedStatus = e.target.checked;
    animateArrowSign(checkedStatus);
    if (checkedStatus) {
      scrollToTermSection("expand");
    } else {
      // document.querySelector('#displayterm').classList.remove('tabHeight');
      scrollToTermSection("shrink");
    }
  }

  function scrollToTermSection(action = "expand") {
    if (action === "expand")
      document.querySelector("#rewardD").scrollIntoView({
        behavior: "smooth",
      });
    else if (action === "shrink") {
      document.querySelector("#header").scrollIntoView({ behavior: "smooth" });

      //for smooth scroll when back to top
      // setTimeout(() => {
      // document.querySelector('#displayterm').classList.add('tabHeight');
      // }, 900);
    }
  }

  function codeNavigate(action, codeIndex, codeTotalLength) {
    document.getElementById("controlFade").classList.remove("fade-tab");

    if (action === "prev") {
      if (codeIndex === 0) return;
      setCodeIndex((state) => state - 1);
    } else if (action === "nxt") {
      if (codeIndex === codeTotalLength - 1) return;
      setCodeIndex((state) => state + 1);
    }
  }

  return (
    // <LoadingScreen loadingScreen={loading}></LoadingScreen>
    <div className={styles.rewardDetailSection}>
      <Loader
        loading={loading}
        customStyle={customLoadingStyle}
        customColr="#000"
      />
      <ContentShape
        // customerName={name}
        customerName="Choco CRM"
        description="ได้รับสิทธิพิเศษ"
        detail={detail}
      />
      {rewardType === "e-code" && (
        <>
          <div className={styles.details}>
            <div className={`${styles.lineDetail} font-t-1 font-dy2`}>CODE</div>
          </div>
          <div className={styles.frameBarCode}>
            <div className={styles.displayBarcode}>
              {/* <div className={styles.displayBarCodeWrap}>
                {barCodeRender.map((element, index) => (
                  <div className={styles.inlineBarcode} key={index}>
                    <canvas
                      id={`mycanvas${index}`}
                      className={`${styles.barCodeFrame}`}
                    ></canvas>
                    <div className="font-t-1 font-t-1">
                      {element.Code.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div> */}
              <div id="controlFade" className="fade-tab">
                {/* <canvas
                  id="mycanvas"
                  className={`${styles.barCodeFrame}`}
                ></canvas> */}
                <div className={`font-t-1 ${styles.codeText}`}>
                  {barCodeText.toUpperCase()}
                </div>

                {/* <QRCode
                  bgColor="#FFFFFF"
                  style={{ width: 120 }}
                  fgColor="#000000"
                  level="Q"
                  // value={rewardCode}
                  value={data.code}
                /> */}
              </div>
              <div className={`${styles.controlPanel} ${displayControl}`}>
                <NavigateBTN
                  action="prev"
                  codesLenght={codesLenght}
                  codesIndex={codeIndex}
                  handleClickNavigateChange={codeNavigate}
                />
                {/* className={`${styles.itemValSpace}`} */}
                <div className={`${styles.displayText} font-t-1 custom-t-14`}>
                  {codeIndex + 1}/{codesLenght}
                </div>
                <NavigateBTN
                  action="nxt"
                  codesLenght={codesLenght}
                  codesIndex={codeIndex}
                  handleClickNavigateChange={codeNavigate}
                />
              </div>
            </div>
          </div>

          <div
            id="rewardD"
            className={`${styles.moreDetails} font-t-1 font-z-1`}
          >
            <div className={`${styles.textWrap}`}>
              <label htmlFor="term">
                <span className={`${styles.text}`}>รายละเอียดของรางวัล </span>
                <span className={`${styles.arrowWrap} `}>
                  <ArrowDown className={`${styles.arrowSymbol} animateArrow`} />
                </span>
              </label>
            </div>
            <hr className={styles.lineMod} />
            <Accordion
              idControl="term"
              // animateArrowSign={animateArrowSign}
              termCon={detail.TermsAndCondsTh}
              handleExpandClick={handleExpandClick}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default RewardDetails;
