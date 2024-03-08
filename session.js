const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();//객체생성
const port = 3000;

app.use(session({
  secret: "secret code",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl:process.env.DB_LOCAL_URL}),
  cookie: {maxAge:1000*60*60*24},
}));

app.get("/",(req,res)=>{
  if(req.session.count){
    req.session.count++;
    res.send(`${req.session.count}번째 방문입니다.`)
  }else{
    req.session.count = 1;
    res.send('첫번째 방문입니다.')
  }
})

app.get("/session",(req,res)=>{
  res.send(req.session.cookie)
})

app.get("/delete-session",(req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      console.log(err.message);
    }else{
      res.clearCookie("connect.sid");//삭제할 세션 이름
      res.send("세션 삭제");
    }
  })
})

app.listen(port, ()=>{
  console.log("서버시작!")
});