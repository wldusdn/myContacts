const express = require('express');
const dbConnect = require('./config/dbConnect')
// const errorhandler = require('./middlewares/errorhandler');
const methodOverride = require("method-override")

const app = express()
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.use(methodOverride("_method"));

const port = 3000;
dbConnect();//db 연결


// const logger = (req, res, next)=>{
//   console.log('User Logged');
//   next();
// }


// app.get("/",(req,res)=>{
//   res.send('hello node');
// });

// const requestTime = (req, res, next) => {
//   let today = new Date();
//   let now = today.toLocaleTimeString();
//   req.requestTime = now;
//   next();
// }

// app.use(requestTime);

// app.get("/", (req, res)=>{
//   const resText = `Hello node! \n요청시간: ${req.requestTime}`;
//   res.send(resText);
//   res.send('hello node!')
// })

// app.use(logger);
app.use(express.json());//형식이 json인 걸 알려주는 코드, 안쓰면 undefined로 뜸
app.use(express.urlencoded({extended:true}));//쿼리스트링 처리, 코드 쓰는 순서도 중요함

app.use("/",require("./routes/loginRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));//router 사용

// app.get("/test", (req, res, next)=>{
//   const error = new Error("test용 error");
//   error.status = 401;
//   next(error)
// })

// app.use(errorhandler)

app.listen(port, ()=>{
  console.log("서버 시작!")
});