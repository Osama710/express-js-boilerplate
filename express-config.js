// internal packages
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
// var { expressjwt: jwt } = require("express-jwt");
// const multipart = require("connect-multiparty");

dotenv.config();

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Register express-jwt middleware
// app.use(
//   jwt({ secret: process.env.JWT_SECRET }).unless({ path: ["/public"] })
// );

// Register connect-multiparty middleware
// app.use(multipart());

// Serve static files
// app.use("/public", express.static(path.join(__dirname, "public")));

module.exports = app;
