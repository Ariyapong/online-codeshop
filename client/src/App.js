import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import "./assets/FDUI/FDUI.css";
import Axios from "axios";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PageNotFound from "./views/page404/page-notfound";
import formBG from "./assets/images/BG2-800px.png";

//page
import PageLayout from "./container/PageLayout";
import ManageReward from './views/manage-reward/manage-reward'
import DisplayReward from "./views/display-reward/display-reward";
import RewardDetails from "./views/privilege/reward-details/reward-details";

function App() {
  const [bgType, setBGType] = useState("");
  const [footerFlag, setFooterFlag] = useState(true);

  // const fetchUsers = () => {
  //   Axios.get("/users/all").then((response) => response.data);
  // };

  const myTheme = {
    palette: {
      primary: {
        main: "#FFCE55",
      },
      secondary: {
        main: "#000000",
      },
      error: {
        main: red.A400,
      },
      type: "light",
    },
    themeName: "awesome theme",
    typography: {
      fontFamily: ["Prompt, sans-serif"].join(","),
      // fontFamily: ["Athiti, sans-serif"].join(","),
    },
  };

  const themeSetting = createMuiTheme(myTheme);
  const setBGLayout = (bgType) => {
    setBGType(bgType);
  };
  const setFooter = (value) => {
    setFooterFlag(value);
  };

  return (
    <ThemeProvider theme={themeSetting}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <Switch>
            <Route path="/manage-reward">
              <PageLayout topbar="top-img-homepage" customBG={formBG}>
                <ManageReward />
              </PageLayout>
            </Route>
            <Route path="/display-reward">
              <PageLayout topbar="top-img-homepage" customBG={formBG}>
                <DisplayReward />
              </PageLayout>
            </Route>
            <Route path="/reward/:param" exact>
              <PageLayout
                customerShow={true}
                enableFooter={footerFlag}
                bgType={`${bgType}`}
              >
                <RewardDetails
                  setBGLayout={setBGLayout}
                  setFooter={setFooter}
                />
              </PageLayout>
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
