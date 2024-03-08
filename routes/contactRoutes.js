const express = require('express');
const {getAllContacts, createContact, getContact, updateContact, deleteContact, addContactForm} = require("../controllers/contactController")
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
router.use(cookieParser());


router.route("/") //contacts뒤에 /이 붙을 때
  .get(checkLogin, getAllContacts)//전체 데이터 불러오기

router.route("/add")
  .get(checkLogin, addContactForm)
  .post(checkLogin, createContact)


router.route("/:id") //contacts뒤에 /id값이 붙을 때
  .get(checkLogin, getContact)
  .put(checkLogin, updateContact)
  .delete(checkLogin, deleteContact)


module.exports = router;