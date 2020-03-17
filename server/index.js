require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/error");

const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const PORT = 8080;

app.use(cors());
//use bodyParser.json() - because we're building APIs
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
   "/api/users/:id/messages",
   loginRequired,
   ensureCorrectUser,
   messagesRoutes
);

//all routes
app.get("/api/messages", loginRequired, async (req, res, next) => {
   try {
      let messages = await db.Message.find()
         .sort({ createdAt: "desc" })
         .populate("user", {
            username: true,
            avatar: true
         });
      return res.status(200).json(messages);
   } catch (err) {
      return next(err);
   }
});

//error handler
app.use((req, res, next) => {
   let err = new Error("Not Found");
   err.status = 404;
   next(err);
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));
