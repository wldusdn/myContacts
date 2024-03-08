const express = require("express");
const cookieParser = require("cookie-parser")

const app = express();//객체생성
const port = 3000;
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.cookie("kim","1234",{ httpOnly: true });
  res.send("쿠키생성")
})

app.get("/cookie",(req,res)=>{
  console.log(req.cookies);
})

app.get("/delete-cookie", (req,res)=>{
  res.clearCookie("kim");
  res.send("쿠키삭제");
})

app.listen(port, ()=>{
  console.log("서버시작!")
});