//1 import express
const express=require('express')

const UserController= require('../Controllers/UserController')
const ProjectController=require('../Controllers/ProjectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig=require('../Middlewares/multerMiddleware')


//2 create Router object of express to define path
const router=express.Router()

//3 register api call
router.post('/register',UserController.register)

//4 login api call
router.post('/login',UserController.login)

//5 add project api call
router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectImage'), ProjectController.addProject)

//6 get a perticular project details api
router.get('/project/get-auser-project',jwtMiddleware,ProjectController.getAProject)

//7 get 3 project details for home projects
router.get('/project/home-project',ProjectController.getHomeProjects)

//8 get all project details
router.get('/project/all-user-project',jwtMiddleware,ProjectController.getAllUsersProjects)

//9 delete user project
router.delete('/project/delete-user-project/:pid',jwtMiddleware,ProjectController.deleteUserProject)

//10 update user project
router.put('/project/update-user-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),ProjectController.updateUserProjects)

//11 my profile api call
// router.post('/project/addprofile-project',jwtMiddleware,multerConfig.single('profile'), UserController.addProfile)
router.post(
    '/project/addprofile-project',
    jwtMiddleware, // Middleware for JWT authentication
    multerConfig.single('profile'), // Middleware for handling file uploads (assuming using multer)
    UserController.addProfile // Controller function for adding a profile to a project
  );
  


module.exports=router