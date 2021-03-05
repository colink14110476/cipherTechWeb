module.exports = (app) => {
  const authController = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Create a new Account
  router.post("/", authController.createAcc);

  // Check if username/password is valid
  router.get("/", authController.getAccAuth);

  // Report all accounts and passwords
  router.get("/report", authController.getAllAcc);

  app.use('/api/auth', router);
};