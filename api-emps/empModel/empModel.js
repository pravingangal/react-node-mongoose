import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

const empSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, indexes: true, unique: true },
    name: { type: String, required: true },
    mob: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    dept: { type: String, required: true },
    sal: { type: Number, required: true },
    status: { type: String, required: true },
    role: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      indexes: true,
      unique: true,
    },
    emailSent: { type: Boolean, default: false },
    pwdHash: { type: String, required: true },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmationToken: { type: String, dafault: "" },
  },
  { timestamps: true }
);

empSchema.methods.encryptPassword = function encryptPassword(pwd) {
  this.pwdHash = bcrypt.hashSync(pwd, 10);
};

empSchema.plugin(uniqueValidator, {
  message: "Duplicate field error..Record not saved..",
});

const empModel = mongoose.model("emps", empSchema);
export default empModel;
