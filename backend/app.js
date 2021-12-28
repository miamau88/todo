const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api/index.js");
app.use(cors());
app.use("/", api);
 
// const { hi, msg } = require('./say')
// console.log(hi(),msg())
// console.log(say.msg())
const port = 5000;
app.use(express.json());

// localhost:3000/todos
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

connection.connect();

app.get("/bbs", (req, res) => {
  // connection.connect();
  connection.query("SELECT * from study.bbs", function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
    console.log(rows);
  });
});

app.delete("/bbs", (req, res) => {
  // connection.connect();    
    const id = req.body.no;    // 속서명 적어줘야됨 
    connection.query(
      `delete from study.bbs where no=?`,
      [id],
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
        console.log(rows);
      }
    );
  });


// /todos / http method
// get, post, patch, delete...

// /todos
// /user
// app.get("/test/:userId/:id",(req,res)=>{

//       console.log(req.params)
// })
// app.get("/todos", (req, res) => {
//   // connection.connect();
//   connection.query("SELECT * from study.todos", function (err, rows, fields) {
//     if (err) throw err;
//     res.send(rows);
//     console.log(rows);
//   });

//   //  connection.end();
// });
// app.delete("/todos/:userId/:id", (req, res) => {
//   // connection.connect();
//   console.log(req.params);
//   // delete?id=1
//   // {
//   //   id: 1
//   // }
//   // todos/1/200
//   // const userId = req.params.userId;
//   // const id = req.params.id;
//   const {userId,id} = req.params
//   connection.query(
//     `delete from study.todos where userId=? and id=?`,
//     [userId, id],
//     function (err, rows, fields) {
//       if (err) throw err;
//       res.send(rows);
//       console.log(rows);
//     }
//   );

//   //  connection.end();
// });

// app.patch("/todos/:userId/:id", (req, res) => {
//   // connection.connect();
//   console.log(req.query);
//   // const userId = req.params.userId;
//   // const id = req.params.id;
//   const {userId,id} = req.params
//   const completed = req.body.completed;

//   connection.query(
//     `update study.todos set completed=? where userId=? and id=?`,
//     [completed, userId, id],
//     function (err, rows, fields) {
//       if (err) throw err;
//       res.send(rows);
//       console.log(rows);
//     }
//   );

//   // connection.end();
// });

// app.post("/todos/:userId", (req, res) => {
//   // connection.connect();
//   console.log(req.params);
//   console.log(req.body)
//   const userId = req.params.userId.trim();
//   const title = req.body.title.trim();
//   // if (title == "123") {
//     // const completed=req.query.completed
//     connection.query(
//       `insert into study.todos (userId,title,completed) value(?,?,'false')`,
//       [userId, title],
//       function (err, rows, fields) {
//         if (err) throw err;
//         res.send(rows);
//         console.log(rows);
//         // if (title == "123") {
//         //   res.json("success");
//         // }
//       }
//     )
//   // } else {
//   //   res.json("fail");
//   // }

//   //  connection.end();
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
