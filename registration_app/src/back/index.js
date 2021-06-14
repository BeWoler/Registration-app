const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

let app = express();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "my_main"
})

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: "userID",
  secret: "task",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
}))

db.connect((err) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log('connected');
  }
})

app.post("/register", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const fName = req.body.name;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if(result.length <= 0) {
        db.query("INSERT INTO users (email, password, name) VALUES (?,?,?)", [email, hash, fName], (err, result) => {
        })
        res.send({message: "Registration was successful"});
      }
      else {
        res.send({message: "Email already exist"});
      }
  })
  })
})

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if(!token) {
    res.send("Error, need a token");
  }
  else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if(err) {
        res.json({auth: false, message: "Failed to authenticate"})
      }
      else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("You are authenticated");
})

app.get("/login", (req, res) => {
  if(req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  }
  else {
    res.send({loggedIn: false})
  }
})

app.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if(response) {
            const id = result[0].ID;
            const token = jwt.sign({id}, "jwtSecret", {
              expiresIn: 300,
            })
            req.session.user = result;
            console.log(req.session.user);
            res.json({auth: true, token: token, result: result});
          }
          else {
            res.json({auth: false, message: "Wrong email or password"});
          }
        })
      }
      else {
        res.json({auth: false, message: "No user exists"});
      }
  })
})

app.listen(3001, () => {
  console.log('running server');
})