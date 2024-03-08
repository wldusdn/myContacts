const asyncHandler = require("express-async-handler");//동기
const User = require("../models/userModel");
const bcrypt = require("bcrypt");//암호화
require("dotenv").config();//env파일 사용
const jwt = require("jsonwebtoken");//jwt 사용 위함
const jwtSecret = process.env.JWT_SECRET;//secret키 가져옴

// @desc Get Login page
// @route GET /
const getLogin = (req, res) => {
  res.render("home");
}

// @desc Login user
// @route POST /
const loginUser = asyncHandler(async(req, res) => {
  // console.log(req.body)
  const {username, password} = req.body;
  const user = await User.findOne({username})
  if(!user){
    return res.status(401).json({message:"일치하는 사용자가 없습니다."})
  }
  const isMatch = await bcrypt.compare(password, user.password);//id 있으면 비번비교
  if(!isMatch){
    return res.status(401).json({message:"비밀번호가 일치하지 않습니다."})
  }
  const token = jwt.sign({id:user._id}, jwtSecret);
  res.cookie("token", token, {httpOnly:true})
  res.redirect("/contacts")
  // if(username === "admin" && password === "1234"){
  //   res.send("로그인 성공")
  // }else{
  //   res.send("로그인 실패")
  // }
})

// @desc Get register page
// @route GET /register
const getRegister = (req, res) => {
  res.render("register")
}

// @desc regist user
// @route POST /register
const registerUser = asyncHandler(async(req, res) => {
  const {username, password, password2} = req.body;
  if(password === password2){
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username,password:hashPassword});
    res.status(201).json({message:"등록성공",user});
  }else{
    res.send("다시 회원가입 해주세요");
  }
})

// @desc logout
// @route POST /logout
const logout = (req,res)=>{
  res.clearCookie("token")
  res.redirect("/")
}

module.exports = {getLogin,loginUser,getRegister,registerUser,logout}