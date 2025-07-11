import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../config/jwt.config.js";
// import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    Address: {
      type: "String",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    socialHandles: [],

    role: {
      type: String,
      enum: ["guest", "user", "admin"],
      default: "guest",
    },
    // if user has any chat history then
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    //if user has any mood history then
    moodHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MoodLog",
      },
    ],
    // tokens
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//bcrypt password just before saving the userSchema
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//creating new method to compare password using bcrypt
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate access token
userSchema.methods.generateAccessToken = function () {
  return generateJWTToken(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRY
  );
};

//generate refresh Token
userSchema.methods.generateRefreshToken = function () {
  return generateJWTToken(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRY
  );
};

export const User = mongoose.model("User", userSchema);
