const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});
app.use(cors());

connection.connect();
const getCtrl = (req, res) => {
  connection.query("SELECT * from study.todos", function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
    console.log(rows);
  });
  //  connection.end();
};

const postCtrl = (req, res) => {
  // connection.connect();
  console.log(req.params);
  console.log(req.body);
  const userId = req.params.userId.trim();
  const title = req.body.title.trim();
  // if (title == "123") {
  // const completed=req.query.completed
  connection.query(
    `insert into study.todos (userId,title,completed) value(?,?,'false')`,
    [userId, title],
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
      console.log(rows);
      // if (title == "123") {
      //   res.json("success");
      // }
    }
  );
  // } else {
  //   res.json("fail");
  // }

  //  connection.end();
};
const patchCtrl =(req,res) =>{

    // connection.connect();
    console.log(req.query);
    // const userId = req.params.userId;
    // const id = req.params.id;
    const {userId,id} = req.params
    const completed = req.body.completed;
    
    connection.query(
      `update study.todos set completed=? where userId=? and id=?`,
      [completed, userId, id],
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
        console.log(rows);
      }
    );
  
    // connection.end();
  }
  
const delCtrl = (req, res) =>{
    // connection.connect();
    console.log(req.params);
    // delete?id=1
    // {
    //   id: 1
    // }
    // todos/1/200
    // const userId = req.params.userId;
    // const id = req.params.id;
    const {userId,id} = req.params
    connection.query(
      `delete from study.todos where userId=? and id=?`,
      [userId, id],
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
        console.log(rows);
      }
    );
  
    //  connection.end();
  }
module.exports = { getCtrl, postCtrl,patchCtrl ,delCtrl};
