import express from 'express'
import { Router } from 'express'
import { registerUser,loginuser,logout,getApprovedUsers, approveUser,rreshtokens, changepassword, currentuser, changeuser, updatedavtar, updatedcoverimage, subscribtionbased, calwatchhistory,getAllUsers } from '../controllers/usser.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { logouting } from '../middlewares/auth.middleware.js'
import { createCourse,getAllCourses } from '../controllers/courses.controller.js'
const router = Router()
router.route("/register").post(
    upload.fields([
        // { name: 'profilePicture', maxCount: 1 },
        { name: 'cnicFront', maxCount: 1 },
        { name: 'cnicBack', maxCount: 1 },
        { name: 'lastDegree', maxCount: 1 },
         { name: 'profilePicture', maxCount: 1 },
    ]),
    registerUser
);
router.route("/login").post(loginuser)
router.route("/logout").post(logouting,logout)
router.route("/refershtoken").post(rreshtokens)
router.route("/change-password").post(logouting,changepassword)
router.route("/currrent-user").get(logouting,currentuser)
router.route("/update-user").patch(logouting,changeuser)
router.route("/update-avatar").patch(logouting,upload.single("avatar"),updatedavtar)
router.route("/update-coverimage").patch(logouting,upload.single("coverimage"),updatedcoverimage)
router.route("/c/:username").get(logouting,subscribtionbased)
router.route("/history").get(logouting,calwatchhistory)
router.route("/getalluser").get(getAllUsers)
router.route("/approve").post( approveUser)
router.route("/getallapproved").get( getApprovedUsers )
router.route("/createcourse").post(upload.fields([{name:"thumbnail",maxCount:1}]),createCourse)
router.route("/getcourse").get(getAllCourses)
export{router}