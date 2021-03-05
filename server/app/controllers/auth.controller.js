const db = require("../models");
const AccountTable = db.accounts;
const Op = db.Sequelize.Op;

// Helper function to send a error response
function sendErrMsg(res,code,msg){
  res.status(code).send({
    message:
      msg
  });
}

// Create and Save a new Account
exports.createAcc = (req, res) => {
  const username=req.body.username;
  const password=req.body.password;

  // Validate request
  if (!username || !password) {
    sendErrMsg(res,400,"Content can not be empty!");
    return;
  }

  // Check if username already exists and create a account if not.
  AccountTable.findOne({where: {username:username}})
    .then(data => {
      // Create an account if username not previously used
      if (!data){
        AccountTable.create({username:username, password:password})
          .then(data => {
            res.send(data);
          })
          .catch(err => sendErrMsg(res,500,err.message || "Some error occurred while creating a new account."));        
      }
      // Username already in use
      else sendErrMsg(res,400,"Username already exists.");
    })
    .catch(err => sendErrMsg(res,500,err.message || "Some error occurred while creating a new account."));   
};

exports.getAccAuth = (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  //Validate request
  if (!username) {
    sendErrMsg(res,400,"Username can not be empty!")
    return;
   }
  if (!password) {
    sendErrMsg(res,400,"Password can not be empty!")
    return;
  }

  AccountTable.findOne({ where: {username: username}})
    .then(data => {
      if (!data) sendErrMsg(res,401,"Username does not exist.");
      else if (data.password !== password) sendErrMsg(res,401,"Invalid Password");
      else res.send(data);
    })
    .catch(err => sendErrMsg(res,500,err.message ||  "Some error occured while signing in."))
}

exports.getAllAcc = (req, res) => {
  AccountTable.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => sendErrMsg(res,500,err.message || "Some error occurred while retrieving accounts."))
};