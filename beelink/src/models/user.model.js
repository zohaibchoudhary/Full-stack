import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true})

userSchema.pre("save", async function(next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function(userId) {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.username
  },
  process.env.TOKEN_SECRET,
  {
    expiresIn: process.env.TOKEN_EXPIRY
  }
)
}

export const User = mongoose.model("User", userSchema)