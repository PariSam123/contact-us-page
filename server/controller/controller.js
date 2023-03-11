const { StatusCodes } = require("http-status-codes")
const User = require('../model/User')
const controller = {
    contact: async (req, res) => {
        try{
            //res.json({ data : req.body })
            //const user = await User.findById({ _id: req.user._id })
            const { name, email, mobile, subject, message, messages } = req.body
            if( !name || !email || !mobile || !subject || !message ){
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please fill the feedback form" })
            }
            const userContact =  await User.findOne({ email, mobile })
                if(userContact){
                    const userMessage =await userContact.addMessage(subject,message)
                    await userContact.save();
                    res.status(StatusCodes.OK).json({ msg: "Thank you for your feedback" })
                    // res.json({ data : userContact })
                }
                else{
                    const newUser = await User.create({ name, email, mobile,messages, subject, message })
                }
            // res.json({ data : newUser })
            // res.status(StatusCodes.OK).json({ data: newUser, msg: "Message send successfully" })    
        }catch (err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    },
    getSingleUser: async (req, res) => {
        try{
            //res.json({ msg: "get single user" })

            const user = await User.findById({ _id: req.user._id })
            res.status(StatusCodes.OK).json({ user })
        }catch (err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    },
    getAllUsers: async (req,res) => {
        try{
            //res.json({ msg: "get all users" })

            const users = await User.find({})

            // const filteredUsers = users.filter(item => item.role !== "superadmin")

            // res.json({ users: filteredUsers })
            res.json({ users: users })
        }catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try{
            let id = req.params.id

            const extUser = await User.findById({ _id: id })
                if(!extUser)
                    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User id not exists." })

            await User.deleteOne({ _id: id })

            res.status(StatusCodes.OK).json({msg: "Successfully deleted the user" })

            //res.json({ msg: "delete user" })
        }catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    }
}
module.exports = controller