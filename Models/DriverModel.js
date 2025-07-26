import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    licenseExpDate: {
      type: String,
    },
    position: {
      type: String,
    },
    department: {
      type: String,
    },
    route: {
      type: String,
    },
    vehicle: {
      type: String,
    },

    isVerified: {
      type: String,
    },
    driverStatus: {
      type: Boolean,
      default: false
    },
    assignVehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle", 
      },
    ],
    assignRoutes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "routes",
      },
    ],
    profileimage: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      default: "686b9d3d9bd9a2274536350b",
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
  return resetToken;
};

const User = mongoose.model("Driver", userSchema);

export default User;
