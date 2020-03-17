const mongoose = require("mongoose");
//running mongo query in terminal
mongoose.set("debug", true);
//native ES2015 promises
//don't need to use callback pattern
//mongoose methods will return Promises
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/warbler", {
   keepAlive: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
});

module.exports.User = require("./User");
module.exports.Message = require("./Message");
