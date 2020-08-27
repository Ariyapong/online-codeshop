const db = require("../models");
const CodeOnline = db.code;
const RewardOnline = db.reward;
const Op = db.Sequelize.Op;

// Create controller for GET request to '/code-register'
exports.regis = async (req, res) => {
  const PurchasedAmount = parseInt(req.body.data.PurchasedAmount);
  const itemId = parseInt(req.body.data.rewardOpt.id);
  // const itemId = req.body.data.rewardOpt.id;
  console.log("request data ===>", req.body.data.PurchasedAmount);

  // return res.send(itemId+"");

  try {
    // find only one avaliable code,
    // return null if none can be found
    const findAvalibleCode = await CodeOnline.findAndCountAll({
      where: {
        RewardId: itemId,
        Redeemed_TS: null,
        MobileNo: null,
        IsActived: true,
        IsDeleted: false,
      },
      limit: PurchasedAmount,
    });

    if (findAvalibleCode !== null) {

      // update data to db by id
      let { rows } = findAvalibleCode;
      let CodeOnlineIdSet = rows.map((agent) => agent.CodeOnlineId);
      // console.log("findedCode Id ", CodeOnlineId);

      let updateInfo = {
        ...req.body.data,
        Redeemed_TS: CodeOnline.sequelize.literal("CURRENT_TIMESTAMP"),
        UpdatedTime: CodeOnline.sequelize.literal("CURRENT_TIMESTAMP"),
      };
      const updateResult = await CodeOnline.update(updateInfo, {
        returning: true,
        // where: { CodeOnlineId: CodeOnlineId },
        where: {
          CodeOnlineId: {
            [Op.in]: CodeOnlineIdSet,
          },
        },
      });

      //destructuring data
      const [, updatedReward] = updateResult;
      let codeData = {};

      if (updatedReward.length > 0) {
        let rewardURL = updatedReward.map(
          (data) =>
            `https://www.code-shop.chococrm.com/reward/digital?campaign1=${data.CampaignKey1}&campaign2=${data.CampaignKey2}`
        );

        //wrap before send to Frontend
        
        codeData.codeURL = rewardURL;
        codeData.isSuccess = true;

      } else {
        codeData.isSuccess = false;

        throw new UserException(
          // "Can't find any item that match your specified target",
          "Can not find any code that match your request",
          "UpdateCodeException"
        );
      }

      return res.send(codeData);

    } else {
      throw new UserException(
        // "Can't find any item that match your specified target",
        "There are no any code avaliable for your request",
        "RegisterCodeException"
      );
      // return res.send(error);
    }
  } catch (error) {
    console.log("error some!!==>", error);
    let data = {
      ...error,
    };
    return res.status(400).send(data);
  }

  
};

function UserException(message, exceptionName) {
  this.message = message;
  this.name = exceptionName;
}

// Make the exception convert to a pretty string when used as a string
// (e.g., by the error console)
UserException.prototype.toString = function () {
  return `${this.name}: "${this.message}"`;
};

// const findTargetData = async () => {
//   try {
//     // find only one avaliable code
//     const findAvalibleCode = await CodeOnline.findAndCountAll({
//       where: {
//         Redeemed_TS: null,
//         MobileNo: null,
//         IsActived: false,
//       },
//       limit: 1,
//       offset: 1,
//     });

//     return findAvalibleCode;
//   } catch (error) {
//     console.log("error some!!==>", error);
//     return 0;
//   }
// };
