const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email id required'],
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number required'],
    },
    messages: [
        {
            subject: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ]
}, {
    collection: "users",
    timestamps: true
});

UserSchema.methods.addMessage = async function(subject,message){
    try{
        this.messages = this.messages.concat({ subject,message })
        await this.save();
        return this.messages;
    }catch(error){
        console.log(error)
    }
}

module.exports = mongoose.model("User", UserSchema)