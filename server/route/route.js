const route = require("express").Router()
const controller = require('../controller/controller')

//user
route.post(`/user/contact`, controller.contact)
 
//admin
route.get(`/user/:id`, controller.getSingleUser)
route.get(`/allusers`, controller.getAllUsers)
route.delete(`/delete/:id`, controller.delete)

module.exports = route