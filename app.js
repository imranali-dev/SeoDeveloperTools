require("dotenv").config();
const cors = require('cors');
const express = require("express");
const cloudinary = require("cloudinary").v2;
const app = express();
const mongoose = require("mongoose");
const authrRouter = require('./routes/users.js');
const methodOverride = require('method-override');
const DatabaseOfMongo = process.env.MONGO_URI;
const PORT = 9895 || 9896;
const ejs = require('ejs');
const fs = require('fs')
var useragent = require('express-useragent');
const path = require('path');
const bodyParser = require('body-parser');
// viws engine 
app.set("view engine", "ejs");
app.use(express.static('public'));
app.set("views", path.join(__dirname, "./views"));
// Routers
const authRoutes = require("./routes/users");
const router = require("./routes/AdminRoutes.js");
const socilarouter = require("./routes/SocialRoutes.js");
const Buyandsell = require("./routes/BuyandsellRoutes.js");
const socialsell = require("./routes/SocialSellRoutes.js");
const BuyAccountsRoutes = require("./routes/BuyAccountsRoutes.js");
const Accoutn = require("./routes/PaymentRouter.js");
const ChatApp = require("./routes/livechatRoutes.js");
const cloudinaryRouter = require("./middlewares/cloudnray/cloudinaryRouter.js");

const connectWithRetry = () => {
  mongoose
    .connect(DatabaseOfMongo, {
      dbName: "Seotollers",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Database connection success.");
      app.use(methodOverride('_method'));
      app.use(bodyParser.json());
      const corsOptions = {
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      };
      app.use(cors(corsOptions));
      app.use(useragent.express());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(express.json()); // for parsing application/json
      app.use(express.urlencoded({ extended: true }));
      app.use(express.static(__dirname + "/public"));
      app.use("/cloudinaryupload", express.static("cloudinaryupload"));

      // cloudnary uploads 
      if (!fs.existsSync("./cloudinaryupload")) {
        fs.mkdirSync("./cloudinaryupload");
      }

      // cloudinary config file 
      cloudinary.config({
        cloud_name: 'dpqks8bvs',
        api_key: '845448596562755',
        api_secret: 'GKu1_IPbQITbsqLN0zjh8HMMq6o'
      });
      // if there is any error 
      if (!cloudinary.config().cloud_name) {
        console.error('Cloudinary configuration failed. Check your credentials.');
        process.exit(1);
      }
      // Routes
      app.get("/ping", (req, res) => {
        return res.send({
          error: false,
          message: "Server is healthy",
        });
      });
      app.use("/users", authRoutes);
      app.use("/sell", authrRouter);
      app.use("/admin", router);
      app.use('/social', socilarouter);
      app.use("/buyandsell", Buyandsell)
      app.use('/socialsell', socialsell)
      app.use('/BuyAccounts', BuyAccountsRoutes)
      app.use('/Account', Accoutn)
      app.use('/Chat', ChatApp);
      app.use("/cloudinaryupload", cloudinaryRouter);

      // Generic Error Handling Middleware
      app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
      });
      // Start the server
      const server = app.listen(PORT, () => {
        console.log("Server started listening on PORT: " + PORT);
      });
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use`);
        } else {
          console.error('An unexpected error occurred:', err);
        }
        process.exit(1);
      });
    })
    .catch((err) => {
      console.error("Mongo Connection Error", err);
      console.log("Retrying MongoDB connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();