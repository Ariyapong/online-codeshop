const db = require("../models");
const RewardOnline = db.reward;
const Op = db.Sequelize.Op;

// Create controller for GET request to '/api'
exports.rewardDetail = async (req, res) => {
  const id = 1;
  console.log("debug instance : ", RewardOnline);

//   RewardOnline.findAll({
//     where: {
//       IsActive: true,
//     },
//   })
//     .then((response) => {
//       console.log("result reward data=====>", response);
//       let data = {
//         rewardData: [...response],
//         isSuccess: true,
//       };
//       res.send(data);
//       // res.send("existed");
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving Tutorial with id=" + id,
//       });
//     });

  res.send("send something back!!");
};
