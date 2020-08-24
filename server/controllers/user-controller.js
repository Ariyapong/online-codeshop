// server/controllers/home-controller.js
// Import json with list of users

const db = require("../models");
const CodeOnline = db.code;
const Op = db.Sequelize.Op;

const users = require('../data/users.json')
// Create controller for GET request to '/users/all'
exports.usersGetAll = async (req, res) => {
  // res.send('There will be dragons, not posts.')

  // const id = 99;
  // console.log("debug instance : ", CodeOnline)
  // CodeOnline.findByPk(id)
  // // CodeOnline.findAll({attributes: ['CodeOnlineId']})
  // // CodeOnline.findAll({
  // //   attributes: ['CodeOnlineId', 'CampaignSeries']
  // // })
  //   .then(data => {
  //     console.log("result data=====>", data);
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error retrieving Tutorial with id=" + id
  //     });
  //   });



  res.json(users)
}