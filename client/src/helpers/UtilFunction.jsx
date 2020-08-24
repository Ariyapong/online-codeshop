import Axios from "axios";
import { EMAILFILTER, NAMEPOLICYWITHDASH } from "../helpers/Regex";
const liff = window.liff;

export default function TruncateString(props) {
  let originalString = props;
  let lengthStr = 40;
  let trimmedString =
    originalString.length > lengthStr
      ? originalString.substring(0, lengthStr - 3) + "..."
      : originalString;

  return trimmedString;
}

//filter input when only allow numbers
export function filterInputNumber(mobileNo) {
  let onlyNumber = mobileNo.replaceAll(/\D/, '');
  onlyNumber = onlyNumber.replaceAll(/[-]/, '');
  onlyNumber = onlyNumber.replaceAll(/[.]/, '');
  return onlyNumber;
}

//validate email pattern
export function validateEmail(email) {
  if (EMAILFILTER.test(email)) {
    return true;
  }
  return false;
}

export function FilterInputName(nameSurname) {
  if (NAMEPOLICYWITHDASH.test(nameSurname)) {
    return true;
  }
  return false;
}

//useful when work with page loading or fetching data from any storage
export function handleChangeLoading(loading) {
  // this.handleSetLoading(loading);
  if (loading) {
    document.querySelectorAll("#fade-load").forEach(o => {
      o.style.display = "block";
    });
    document.querySelectorAll("#block-ui").forEach(o => {
      o.style.display = "block";
      o.classList.add("active");
    });
    document.querySelectorAll("#root").forEach(o => {
      o.style.pointerEvents = "none";
    });
  } else {
    document.querySelectorAll("#block-ui").forEach(o => {
      o.classList.remove("active");
    });
    document.querySelectorAll("#fade-load").forEach(o => {
      o.style.display = "none";
    });
    document.querySelectorAll("#block-ui").forEach(o => {
      o.style.display = "none";
    });
    document.querySelectorAll("#root").forEach(o => {
      o.style.pointerEvents = "all";
    });
  }
}

//get querystring parameters from current page
export function getQueryVariable(variable) {
  let selectRegisToken = window.location.search.substring(1);
  let splitRegisToken = selectRegisToken.split("&");
  for (let i = 0; i < splitRegisToken.length; i++) {
    let pair = splitRegisToken[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }

  return false;
}

export function calPromo(Data1, Data2) {
  if (Data1 === "Percentage") {
    let Data = "%";
    return Data;
  }
  if (Data1 === "Add") {
    let Data = "+";
    return Data;
  }
  if (Data1 === "Multiply") {
    let Data = "x";
    return Data;
  }
  if (Data2 === "Percentage") {
    let Data = "%";
    return Data;
  }
  if (Data2 === "Add") {
    let Data = "+";
    return Data;
  }
  if (Data2 === "Multiply") {
    let Data = "x";
    return Data;
  }
}

export function ReplaceValue(Value) {
  if (Value === "welcome-bonus") {
    let Value = "Welcome Bonus";
    return Value;
  }
  if (Value === "birthday") {
    let Value = "birthday bonus";
    return Value;
  } else {
    return Value;
  }
}

//set common token in Axios header
export function setAxiosHeaderToken() {
  let RegisterToken = window.sessionStorage.getItem("ClientToken");
  Axios.defaults.headers.common["Authorization"] = "Bearer " + RegisterToken;
}

export function setCustomerTokenHeader() {
  let RegisterToken =
    window.localStorage.getItem("CustomerToken") !== ""
      ? window.localStorage.getItem("CustomerToken")
      : "";
  Axios.defaults.headers.common["Authorization"] = "Bearer " + RegisterToken;
}

export function scrollToTopPage() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export function isInLiff() {
  let status = null;
  if (liff.isInClient()) {
    status = true;
  } else {
    status = false;
  }
  return status;
}

//fixed kb issue in lift
// export function focusInput(){
//     let getScrollHeight = window.scrollY;
//     setScrollPos(getScrollHeight);
//     console.log(getScrollHeight);
// }

// export function BlurInput(scrollPos) {
//     document.body.scrollTo = scrollPos;
//     document.documentElement.scrollTop = scrollPos;
//     console.log("updateComplete");
// }
