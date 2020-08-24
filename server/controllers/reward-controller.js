const db = require("../models");
const RewardOnline = db.reward;
const CodeOnline = db.code;
const Op = db.Sequelize.Op;

// Create controller for GET request to '/api'
exports.rewardGet = async (req, res) => {
  const id = 1;
  console.log("debug instance : ", RewardOnline);
  RewardOnline.findAll({
    where: {
      IsActive: true,
    },
  })
    .then((response) => {
      console.log("result reward data=====>", response);
      let data = {
        rewardData: [...response],
        isSuccess: true,
      };
      res.send(data);
      // res.send("existed");
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });

  // res.send("Welcome back commander.");
};

// Create controller for GET request to '/api'
exports.rewardDetail = async (req, res) => {
  const id = 1;
  const query = req.query;
  // console.log("debug instance : ", RewardOnline);

  try {
    //select item that match campaignKey1&2 first

    const result = await CodeOnline.findOne({
      where: {
        CampaignKey1: req.query.campaign1,
        CampaignKey2: req.query.campaign2,
      },
    });
    // let { RewardId } = result;

    if (result) {

      //wrap data before send to fe
      const resultRewardDetail = await RewardOnline.findOne({
        where: {
          RewardId: result.RewardId ? result.RewardId : '',
        },
      });

      let data = {
        rewardDetail: resultRewardDetail,
        codeData : {
          CodeOnlineId: result.Code,
          Code: result.Code
        }
      };

      res.send(data);
    } else {
      throw new CodeException(
        // "Can't find any item that match your specified target",
        "Can not find any code that match your request",
        "FindCodeException"
      );
    }
  } catch (error) {
    console.log("error obj:", error);
    let data = {
      ...error,
    };

    return res.status(400).send(data);
  }
  // res.send(query);
};

function CodeException(message, exceptionName) {
  this.message = message;
  this.name = exceptionName;
}

CodeException.prototype.toString = function () {
  return `${this.name}: "${this.message}"`;
};
