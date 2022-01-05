import mongoose from "mongoose";
import validator from "validator";
import { User } from "../interfaces/Userinterface";
import uniqueValidator from "mongoose-unique-validator";
export const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: [true, "email is required"],
      validate: [validator.isEmail, "Enter a valid email address."],
      unique: true,
    },
    isAdmin: { type: Boolean, default: false },

    password: { type: String, required: [true, "password is required"] },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
userSchema.virtual("tepassword");
userSchema.path("password").validate(function () {
  if (this.tepassword) {
    let x: boolean = validator.isStrongPassword(this.tepassword, {
      minLength: 4,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    });

    if (!x) {
      this.invalidate("password", "Password is weak");
    }
  }
});

userSchema.plugin(uniqueValidator, { message: " {PATH} Already exists" });

const UserModel = mongoose.model<User>("User", userSchema);
export { UserModel };
