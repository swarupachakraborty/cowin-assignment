const express = require('express');
const router = express.Router();

const userController = require("../Controller/userController")

const adminController = require('../Controller/adminController');


//User APIs
router.post("/register",userController.CreateUser)
router.post('/login', userController.userLogin)
router.post('/admin',adminController,Createadmin)