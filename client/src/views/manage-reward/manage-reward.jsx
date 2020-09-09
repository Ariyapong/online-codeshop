import React, { useState, useEffect } from "react";
import styles from "./manage-reward-style.module.scss";
import { filterInputNumber } from "../../helpers/UtilFunction";
import InputMask from "react-input-mask";

/**lib*/
import {
  TextField,
  Button,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  DialogTitle,
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import AxiosOri from "axios";
import Axios from "../../helpers/API/my-axios";
import { useForm, Controller, useWatch } from "react-hook-form";
import { format } from "date-fns";
import _ from "lodash/fp";
import { useHistory } from "react-router-dom";
/**lib*/
import regis from "../../assets/images/regis-img.png";

/******component styles(start) */
const useStyles = makeStyles(() => ({
  root: {
    "&.customForm .MuiInputLabel-shrink": {
      // fontWeight: '800',
      color: "rgba(0, 0, 0, 1)",
    },
    "& .MuiTextField-root": {
      //   margin: theme.spacing(1),
      //   width: "25ch",
      margin: "0.5rem 0",
    },
    "@media screen and (min-width: 768px)": {
      width: "80%",
      margin: "0 auto",
    },
  },
  customButton: {
    margin: "10px",
    minWidth: "30vw",
    "@media screen and (min-width: 768px)": {
      minWidth: "100%",
      margin: "unset",
    },
  },
  dateTimePickerWidth: {
    width: "100%",
  },
  dialogCustom: {
    margin: "5%",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const stylesSelect = makeStyles((theme) => ({
//   root: {
//     "&:hover": {
//       backgroundColor: "#fff",
//     },
//     "&$focused": {
//       backgroundColor: "red",
//     },
//   },
// }));

/******component styles(end) */

/******cInitialze variable(start) */
const initDefaultDate = () =>
  format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

/******cInitialze variable(end) */

function ManageReward() {
  // const classesStyle = stylesSelect();
  const classes = useStyles();
  const history = useHistory();

  /**state data(start)*/
  const { handleSubmit, control, errors, watch, register } = useForm();
  const [rewardOption, setRewardOption] = useState([
    // { id: "1", label: "Swensens", detail: "มูลค่า 100 บาท" },
    { id: "", label: "", detail: "" },
  ]);
  const [stat, setStat] = useState("");
  const [selectedDate, handleDateChange] = useState(() =>
    format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
  );
  const [dateErr, setDateErr] = useState("");
  // const [selectedDate, handleDateChange] = useState(new Date("2019-01-01T18:54"));
  const [open, setOpen] = useState(false);
  const [renderStat, setRenderStat] = useState("");
  // const [rewardLink, setRewardLink] = useState("");
  const [dialogInfo, setDialogInfo] = useState({
    type: "",
    title: "Reward URL",
    status: 0,
    rewardURL: "",
  });
  const [phoneNo, setPhoneNo] = useState("");

  /**state data(end) */
  // const regex = RegExp(/[^0-9]+$/);
  const regex = RegExp(/^\d+$/);

  const { rewardOpt } = watch(["rewardOpt"]);

  useEffect(() => {
    fetchRewardOption();
    // window.sessionStorage.removeItem("url");
  }, []);

  useEffect(() => {
    if (dialogInfo.status) handleOpenDialog();
  }, [dialogInfo]);

  useEffect(() => {
    if (rewardOpt) {
      manageDBStat(stat, rewardOpt.id);
    }
  }, [rewardOpt]);

  const handlePhoneNoChange = (event) => {
    console.log("phone vluae", event.target);
    setPhoneNo(event.target.value);
  };

  const manageDBStat = (data, target) => {
    if (data) {
      //find target dataset
      const totalReward = data.total.filter(
        (element) => element.RewardId === target
      );
      const availableReward = data.available.filter(
        (element) => element.RewardId === target
      );
      const usageReward = data.usage.filter(
        (element) => element.RewardId === target
      );

      // console.log(
      //   "manageDBStat -> totalReward",
      //   totalReward,
      //   "target id :",
      //   target
      // );
      // console.log(
      //   "manageDBStat -> availableReward",
      //   availableReward,
      //   "target id :",
      //   target
      // );
      // console.log("usageReward reward !", usageReward, "target id :", target);

      setRenderStat(renderDBStat(totalReward, availableReward, usageReward));
    }
  };

  const renderDBStat = (totalReward, availableReward, usageReward) => (
    <div className={styles.statContainer}>
      <div className={styles.statContentBlock}>
        <div className={styles.content}>
          <div className={styles.borderFrame}>
            <div className={styles.headLine}>Total</div>
            <div className={styles.stat}>
              {totalReward.length > 0 ? totalReward[0].rewardTotal : 0}
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.borderFrame}>
            <div className={styles.headLine}>Usage</div>
            <div className={styles.stat}>
              {usageReward.length > 0 ? usageReward[0].usageTotal : 0}
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.borderFrame}>
            <div className={styles.headLine}>Available</div>
            <div className={styles.stat}>
              {availableReward.length > 0
                ? availableReward[0].availableReward
                : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**handle Func(start) */
  const handleSubmitForm = async (formData) => {
    console.log("Form Submit!!", formData);
    let phoneResult = phoneNo.replace(/-/g,"");

    // console.log("phone no ", phoneNo);
    // console.log("phone no ", phoneResult);

    let dialogData = { ...dialogInfo };
    let data = {
      ...formData,
      Purchased_TS: selectedDate,
      // IsActived: true,
    };

    try {
      const registerReward = await Axios.post("/register-code", { data });
      let { codeURL, isSuccess } = registerReward.data;
      // dialogData.type = "ok";
      // dialogData.title = "Reward URL";
      // dialogData.status = 1;
      // dialogData.rewardURL = rewardURL;
      if (isSuccess) {
        window.sessionStorage.setItem("url", JSON.stringify(codeURL));
        history.push("/display-reward");
      }
      // setDialogInfo(dialogData);
      console.log(registerReward);
    } catch (error) {
      let { message, name, errorCode } = error.response.data;
      dialogData.type = "error";
      dialogData.title = name;
      dialogData.errorCode = errorCode;
      dialogData.status = 1;
      dialogData.rewardURL = message;
      setDialogInfo(dialogData);

      // console.log("error res");
    }

    // .then((res) => {
    //     console.log("debug data: ", res);
    // })
  };

  const fetchRewardOption = async () => {
    try {
      // const rewardList = await Axios.get("/reward-list");
      const rewardList = await Axios.get("/api/reward/list");
      let { rewardData, stat } = rewardList.data;

      let buildOption = rewardData.map((info) => ({
        id: info.RewardId,
        label: info.Reward_Name,
        detail: info.Reward_Detail,
      }));

      // let buildOption = [
      //   {
      //     id: "1",
      //     label: "Swensens",
      //     detail: "มูลค่า 100 บาท",
      //   },
      // ];

      console.log("handleFetchReward -> buildOption", buildOption);
      setRewardOption(buildOption);
      setStat(stat);

      // console.log(typeof rewardList.data);
      // if(registerReward) {
      //     isSuccess: true,
      // }
    } catch (error) {
      console.log("error res", error);
    }
  };

  const handleDateChangeSet = (date, value) => {
    const checkIfValid = `${date}`;
    if (checkIfValid === "Invalid Date") setDateErr(true);
    else {
      let newDateSend = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      handleDateChange(newDateSend);
      setDateErr(false);
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  /**handle Func(end) */

  return (
    <div className={styles.submitFormLink}>
      <div className={styles.pageSubject}>
        <div className={`${styles.subjectText}`}>
          <div className={styles.regisIcon}>
            <img src={regis} className="img-width elemblock" alt="" />
          </div>
          Reward Registration
        </div>
      </div>
      <form
        className={`${classes.root} customForm`}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        {renderStat}
        <Controller
          render={(props) => (
            <Autocomplete
              {...props}
              id="reward-select"
              disableClearable
              options={rewardOption}
              getOptionLabel={(option) => {
                return option.label;
              }}
              getOptionSelected={(option) => {
                return option;
              }}
              renderOption={(option) => (
                <span id={option.id}>
                  {option.label} {option.detail}
                </span>
              )}
              value={rewardOption.label}
              // value={
              //   rewardOption.length < 2 ? rewardOption[0] : rewardOption.label
              // }
              onChange={(_, data) => props.onChange(data)}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    id="outlined-search"
                    label="Select Reward"
                    type="text"
                    variant="outlined"
                    fullWidth
                    name="Remark"
                    error={errors.rewardOpt ? true : false}
                  />
                );
              }}
            />
          )}
          name="rewardOpt"
          control={control}
          defaultValue=""
          // defaultValue={rewardOption[0]}
          rules={{ required: true }}
        />
        {errors.rewardOpt && errors.rewardOpt.type === "required" && (
          // <div>{console.log(errors)}</div>
          <FormHelperText error>Please specify reward type</FormHelperText>
        )}

        <TextField
          id="outlined-search"
          label="First Name"
          type="text"
          variant="outlined"
          fullWidth
          name="FirstName"
          error={errors.FirstName ? true : false}
          inputRef={register({ required: true })}
        />
        {errors.FirstName && errors.FirstName.type === "required" && (
          // <div>{console.log(errors)}</div>
          <FormHelperText error>
            Please enter customer first name{" "}
          </FormHelperText>
        )}
        <TextField
          id="outlined-search"
          label="Last Name"
          type="text"
          variant="outlined"
          fullWidth
          error={errors.LastName ? true : false}
          name="LastName"
          inputRef={register({ required: true })}
        />
        {errors.LastName && errors.LastName.type === "required" && (
          // <div>{console.log(errors)}</div>
          <FormHelperText error>
            Please enter customer last name{" "}
          </FormHelperText>
        )}
        <InputMask
          mask="999-999-9999"
          onChange={handlePhoneNoChange}
          value={phoneNo}
          disabled={false}
          maskChar="_"
        >
          {() => (
            <TextField
              id="outlined-search"
              label="Mobile No."
              type="tel"
              variant="outlined"
              fullWidth
              // inputProps={{ maxLength: 10 }}
              error={errors.MobileNo ? true : false}
              name="MobileNo"
              inputRef={register({
                required: true,
                minLength: 10,
                // // pattern: /\D/
                // // validate: (value) => console.log("result value", regex.test(value)),
                // validate: (value) =>
                //   regex.test(value) === true ||
                //   "Please enter only number in this field",
              })}
            />
          )}
        </InputMask>

        {errors.MobileNo && errors.MobileNo.type === "required" && (
          // <div>{console.log(errors)}</div>
          <FormHelperText error>
            Please enter customer mobile no.{" "}
          </FormHelperText>
        )}
        {errors.MobileNo && errors.MobileNo.type === "minLength" && (
          // <div>{console.log(errors)}</div>
          <FormHelperText error>
            Mobile no. should at least be 10 digits{" "}
          </FormHelperText>
        )}
        {errors.MobileNo && errors.MobileNo.type === "validate" && (
          <FormHelperText error>
            Please enter only number in this field{" "}
          </FormHelperText>
        )}
        <TextField
          id="outlined-search"
          label="Remark"
          type="text"
          variant="outlined"
          fullWidth
          name="Remark"
          inputRef={register()}
        />
        <TextField
          id="outlined-search"
          label="Purchased Amount"
          type="text"
          variant="outlined"
          fullWidth
          name="PurchasedAmount"
          inputRef={register({
            required: true,
            validate: (value) =>
              regex.test(value) === true ||
              "Please enter only number in this field",
          })}
          error={errors.PurchasedAmount ? true : false}
        />
        {errors.PurchasedAmount && errors.PurchasedAmount.type === "required" && (
          // <div>{console.log(errors)}</div>
          <FormHelperText error>
            Please specify customer qty. order{" "}
          </FormHelperText>
        )}
        {errors.PurchasedAmount &&
          errors.PurchasedAmount.type === "validate" && (
            <FormHelperText error>
              Please enter only number in this field{" "}
            </FormHelperText>
          )}
        <KeyboardDateTimePicker
          value={selectedDate}
          onChange={handleDateChangeSet}
          label="Customer Purchased Time"
          onError={console.log}
          minDate={new Date("2018-01-01T00:00")}
          // format="yyyy/MM/dd hh:mm a"
          format="yyyy/MM/dd hh:mm a"
          inputVariant="outlined"
          className={classes.dateTimePickerWidth}
          allowKeyboardControl={true}
        />
        {dateErr && (
          // <div>{console.log(errors)}</div>
          <FormHelperText error>Invalid date </FormHelperText>
        )}
        <Button
          variant="outlined"
          color="secondary"
          className={classes.customButton}
          type="submit"
        >
          Register
        </Button>
      </form>
      {/* dialog sectioin */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: classes.dialogCustom }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ color: "red" }}
        >{`Error (${dialogInfo.errorCode})`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogInfo.rewardURL}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
          {/* <Button onClick={handleCloseDialog} color="secondary">
            ตกลง
          </Button> */}
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.customButton}
        style={dialogInfo.type === "ok" ? {} : { display: "none" }}
        onClick={handleOpenDialog}
      >
        View URL
      </Button>
      {/* dialog sectioin */}
      {/* <Button
        variant="outlined"
        color="secondary"
        className={classes.padButton}
        onClick={handleFetchReward}
      >
        reward
      </Button> */}
    </div>
  );
}

export default ManageReward;
