const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route Get /contacts
const getAllContacts = asyncHandler(async(req,res)=>{ //비동기 처리와, await사용위함
  const contacts = await Contact.find();
  // res.status(200).send("<h1 style='color:green'>Contacts Page</h1>"); 템플릿엔진 쓰기 전 코드
  // res.status(200).render("getAll", {heading:"User List", contacts:contacts});
  res.render("index",{contacts:contacts});
})

// @desc view add contact form
// @route Get /add
const addContactForm = (req,res)=>{
  res.render("add");
}

// @desc Create contacts
// @route Post /contacts/add
const createContact = asyncHandler(async(req,res)=>{
  const {name,email,phone} = req.body;
  console.log(name);
  if(!name || !email || !phone){
    return res.status(400).send("필수값이 입력되지 않았습니다")
  }
  const contact = await Contact.create({name,email,phone});
  // res.status(201).send("Create Contents")
  res.redirect("/contacts")
})

// @desc Get a contact
// @route Get /contacts/:id
const getContact = asyncHandler(async(req,res)=>{
  const contact = await Contact.findById(req.params.id);
  // res.status(200).send(contact)
  res.render("update", {contact:contact});
})

// @desc Put a contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const {name,email,phone} = req.body;
  //id 기준으로 찾기
  const contact = await Contact.findById(id);
  if(!contact){
    res.status(404)
    throw new Error("연락처가 없습니다");
  }
  //원하는 값 수정해서 넣기
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  contact.save()//수정 후 저장
  // res.status(200).send(`update:${req.params.id}`)
  res.redirect("/contacts")
})

// @desc Delete a contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  //id 기준으로 찾기
  const contact = await Contact.findByIdAndDelete(id);
  // res.status(200).send(`delete:${req.params.id}`)
  res.redirect("/contacts")
})

module.exports = {getAllContacts, createContact, getContact, updateContact, deleteContact, addContactForm}