import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {type: String, required: [true, 'Email already exists!'], unique: [true, 'Email is required!']},
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match:  [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {type: String}
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;