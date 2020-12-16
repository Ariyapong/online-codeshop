const db = require("../models");
const RewardOnline = db.reward;
const CodeOnline = db.code;
const Op = db.Sequelize.Op;

// Create controller for GET request to '/api'
exports.rewardGet = async (req, res) => {
  const id = 1;
  // console.log("debug instance : ", RewardOnline);

  // RewardOnline.findAll({
  //   where: {
  //     IsActive: true,
  //   },
  // })
  //   .then((response) => {
  //     console.log("result reward data=====>", response);

  //     let data = {
  //       rewardData: [...response],
  //       isSuccess: true,
  //     };

  //     res.send(data);
  //     // res.send("existed");
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving Tutorial with id=" + id,
  //     });
  //   });

  try {
    const resultRewardOption = await RewardOnline.findAll({
      where: {
        IsActive: true,
      },
    });

    
    if (resultRewardOption.length > 0) {
      // let data = {
      //   rewardData: [...resultRewardOption],
      //   isSuccess: true,
      // };

      // res.send(data);
      // res.send(rewardIdSet);

      const resultTotal = await CodeOnline.findAll({
        // where: {
        //   RewardId: {
        //     [Op.in]: rewardIdSet,
        //   },
        // },
        attributes: [
          "RewardId",
          [
            db.sequelize.fn("COUNT", db.sequelize.col("RewardId")),
            "rewardTotal",
          ],
        ],
        group: ["RewardId"],
      });

      const usageTotal = await CodeOnline.findAll({
        where: {
          Redeemed_TS: {
            [Op.ne]: null
          },
          IsActived: true,
          IsDeleted: false,
        },
        attributes: [
          "RewardId",
          [
            db.sequelize.fn("COUNT", db.sequelize.col("RewardId")),
            "usageTotal",
          ],
        ],
        group: ["RewardId"],
      });

      const availableReward = await CodeOnline.findAll({
        where: {
          Redeemed_TS: null,
          IsActived: true,
          IsDeleted: false,
        },
        attributes: [
          "RewardId",
          [
            db.sequelize.fn("COUNT", db.sequelize.col("RewardId")),
            "availableReward",
          ],
        ],
        group: ["RewardId"],
      });

      let data = {
        rewardData: [...resultRewardOption],
        stat: {
          total: resultTotal,
          usage: usageTotal,
          available: availableReward
        },
        isSuccess: true,
      };

      // res.send(usageTotal);
      res.send(data);
      // console.log("debug2", resultTotal);
    } else {
      throw new CodeException(
        // "Can't find any item that match your specified target",
        "Can not find any reward in database",
        "FindRewardException"
      );
    }
  } catch (error) {
    console.log("error obj:", error);
    let data = {
      ...error,
    };

    return res.status(500).send(data);
  }

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
          RewardId: result.RewardId ? result.RewardId : "",
        },
      });

      // console.log("result ===> ", result);

      let data = {
        rewardDetail: resultRewardDetail,
        codeData: {
          CodeOnlineId: result.Code,
          Code: result.Code,
          DisplayType: result.DisplayStatus,
          DisplayTypeDesc: result.DisplayDescription,
        },
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

    return res.status(500).send(data);
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
