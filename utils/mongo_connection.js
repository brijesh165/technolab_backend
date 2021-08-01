let mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect("mongodb://127.0.0.1:27017/technolab_backend", {
        poolSize: 15,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
      console.log("Database Connection Status: Active")
    })
    .catch((err) => {
      console.error("Database Connection Status: Failed", err)
    })
  }
}

module.exports = new Database();