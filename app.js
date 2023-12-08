require("dotenv").config();
const cors = require('cors');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authrRouter = require('./routes/users.js');
const methodOverride = require('method-override');
const DatabaseOfMongo = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
app.set("view engine", "ejs");
app.use(express.static('public'));
app.set("views", path.join(__dirname, "./views"));
const authRoutes = require("./routes/users");
const router = require("./routes/AdminRoutes.js");
const socilarouter = require("./routes/SocialRoutes.js");
const Buyandsell = require("./routes/BuyandsellRoutes.js");
const socialsell = require("./routes/SocialSellRoutes.js");
const BuyAccountsRoutes = require("./routes/BuyAccountsRoutes.js");
const Accoutn = require("./routes/PaymentRouter.js");
const connectWithRetry = () => {
  mongoose
    .connect(DatabaseOfMongo, {
      dbName: "Seotollers",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection success.");
      // Middleware
      app.use(methodOverride('_method')); // yeah check krta hai ky put request to update krna hai ya nahi
      app.use(bodyParser.json());
      const corsOptions = {
        // origin: 'http://yourfrontenddomain.com', // Replace with your frontend domain
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      };
      app.use(cors(corsOptions));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(express.json()); // for parsing application/json
      app.use(express.urlencoded({ extended: true }));
      // Ping route
      app.get("/ping", (req, res) => {
        return res.send({
          error: false,
          message: "Server is healthy",
        });
      });
      app.use("/users", authRoutes);
      app.use("/sell", authrRouter);
      app.use("/admin", router)
      app.use('/social', socilarouter)
      app.use("/buyandsell", Buyandsell)
      app.use('/socialsell', socialsell)
      app.use('/BuyAccounts', BuyAccountsRoutes)
      app.use('/Account', Accoutn)
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