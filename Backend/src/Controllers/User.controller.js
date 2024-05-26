import { User } from "../Models/User.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asynchandling } from "../Utils/Asynchndling.js";
import {ApiError} from "../Utils/ApiError.js";

const generateAccessandRefreshToken = async (userid) => {
    try {
      const user = await User.findById(userid);
      const accesstoken = user.generateAccessToken();
      const refreshtoken = user.generateRefreshToken();
      user.refreshtoken = refreshtoken;
      await user.save({ validateBeforeSave: false });
  
      return { accesstoken, refreshtoken };
    } catch (error) {
      throw new ApiError(
        500,
        "Something Went Wrong in Generating Access/Refresh Token"
      );
    }
  };

const Loginhandle=asynchandling(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({
        email:email
    });
    if(!user){
        throw new ApiError(400,"User not found");
    }
    if(!user.isPasswordCorrect(password)){
        throw new ApiError(400,"Invalid credentials");
    }
    const { accesstoken, refreshtoken } = await generateAccessandRefreshToken(
        user._id
      );

      const options = {
        httpOnly: true,
        secure: true,
      };
     

    return res.status(200)
    .cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(
        new ApiResponse(200,{"accesstoken": accesstoken,"refreshtoken":refreshtoken },"user logged in successfully")
    )
});

const Registerhandle=asynchandling(async(req,res)=>{
    const {email,password,phoneNumber,role,fullName,lastName}=req.body;
    const user=await User.create({
        email:email,
        password:password,
        phoneNumber:phoneNumber,
        role:role,
        firstName:fullName,
        lastName:lastName,
    });
    if(!user){
        throw new ApiError(400,"User not Creted retry again");
    }
    const userdetail=await User.findById(user._id)
    .select("-password -refreshToken");;
    
    return res.status(201).json(
        new ApiResponse(201,userdetail,"user registered successfully")
    )
});
const getuser=asynchandling(async(req,res)=>{
    const {id}=req.params;
    const user=await User.find({
        _id:id
    });
    return res.status(200).json(
        new ApiResponse(200,user,"user fetched successfully")
    )
});


export {Loginhandle,Registerhandle,getuser};