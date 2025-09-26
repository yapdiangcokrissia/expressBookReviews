const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();
app.use(express.json());

// ---------------- SESSION MIDDLEWARE ----------------
app.use(
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

// ---------------- AUTHENTICATION MIDDLEWARE ----------------
app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session && req.session.authorization) {
    let token = req.session.authorization.accessToken;

    jwt.verify(token, "access", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this route" });
  }
});

// ---------------- ROUTES ----------------
app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
