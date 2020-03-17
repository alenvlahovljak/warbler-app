const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true
      },
      username: {
         type: String,
         required: true,
         unique: true
      },
      password: {
         type: String,
         required: true
      },
      avatar: {
         type: "String"
      },
      messages: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
         }
      ]
   },
   {
      timestamps: true
   }
);

//run before the document is saved in db
userSchema.pre("save", async function(next) {
   try {
      if (!this.isModified("password")) {
         return next();
      }
      //salt is an adiction, so password won't be the same every time
      //the String is hashed
      //bcrypt.hash() is async action
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      return next();
   } catch (err) {
      return next(err);
   }
});

//an idea of instance method, every document has those methods
//define next(), need to tell express when to move on next block
userSchema.methods.comparePassword = async function(candidatePassword, next) {
   try {
      let isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
   } catch (err) {
      next(err);
   }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
