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

  db.query("INSERT INTO users (email, password, name) VALUES (?,?,?)", [email, password, fName], (err, result) => {
    console.log(err);
  })
})

app.listen(3001, () => {
  console.log('running server');
})