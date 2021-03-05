const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/*const connection = await mysql.createConnection({host:dbConfig.HOST, port:dbConfig.PORT, user:dbConfig.USER, password:dbConfig.PASSWORD})
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);*/

db = require("./app/models")
db.sequelize.sync()
//require("./app/routes/tutorial.routes")(app);
require("./app/routes/auth.routes")(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to colin's application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});