module.exports = {
  HOST: "localhost",
  USER: "user",
  PASSWORD: "password",
  PORT: 3306,
  DB: "cyphertechdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};