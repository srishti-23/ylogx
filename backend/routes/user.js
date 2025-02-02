const express=require('express')
const {register,login,getUserDetails} =require('../controllers/user')
const authMiddleware=require('../middlewares/authMiddleware')

const userRouter=express.Router()
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get('/details',authMiddleware,getUserDetails)

module.exports= userRouter

