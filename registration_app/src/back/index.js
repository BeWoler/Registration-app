const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

let app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "my_main"
})

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

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if(result.length <= 0) {
        db.query("INSERT INTO users (email, password, name) VALUES (?,?,?)", [email, password, fName], (err, result) => {
        })
        res.send({message: "Registration was successful"});
      }
      else {
        res.send({message: "Email already exist"});
      }
  })
})

app.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
      if(result.length > 0) {
        res.send(result);
      }
      else {
        res.send({message: "Wrong email or password"});
      }
  })
})

app.listen(3001, () => {
  console.log('running server');
})