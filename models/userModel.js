const mongoose = require("mongoose");
//구조 정의가 필요함
const userSchema = new mongoose.Schema({
    username:{
      type:String,
      required:true,
      unique: true,
    },
    password:{
      type:String,
      required:true,
    },
  });


//모델이름은 첫글자 대문자에 단수형이어야함 ex)Contact, 스키마는 위에 선언해놓은걸 가져다가 씀
module.exports = mongoose.model("User",userSchema);