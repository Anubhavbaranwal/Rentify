import mongoose,{Schema,model} from 'mongoose';
import bycrpt from 'bcrypt';
import Jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['seller', 'buyer'],
    required: true
  },
    refreshtoken: {
        type: String,
    }
},{
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bycrpt.hash(this.password, 10);
    }
    next();
  });
  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bycrpt.compare(password, this.password);
  };
  userSchema.methods.generateAccessToken = function () {
    return Jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };

  userSchema.methods.generateRefreshToken = function () {
    return Jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };
export const User = model('User', userSchema);

// module.exports = User;
