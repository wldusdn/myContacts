const mongoose = require("mongoose");
//구조 정의가 필요함
const contactSchema = new mongoose.Schema(
  {
    name:{
      type:String,//타입 결정
      required:true, //필수 요소인지 아닌지
    },//객체형태로 데이터 입력
    email:{
      type:String,
    },
    phone:{
      type:String,
      required:[true, "전화번호는 꼭 기입해주세요"],//안들어가면 띄울 메시지
    },
  },
  {timestamps:true}
);

const Contact = mongoose.model("Contact",contactSchema);
//모델이름은 첫글자 대문자에 단수형이어야함 ex)Contact, 스키마는 위에 선언해놓은걸 가져다가 씀
module.exports = Contact;