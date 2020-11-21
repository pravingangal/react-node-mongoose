import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";

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


empSchema.methods.checkPassword = function (password) {
  
  const result=bcrypt.compareSync(password, this.pwdHash);
  
  return result;
};

empSchema.plugin(uniqueValidator, {
  message: "Duplicate field error..Record not saved..",
});

empSchema.methods.getAdmin_JSON_WEB_TOKEN = function getAdmin_JSON_WEB_TOKEN(empID) {
  
  return this._getAdmin_JSON_WEB_TOKEN(empID)
};

empSchema.methods.getEmp_JSON_WEB_TOKEN = function getEmp_JSON_WEB_TOKEN() {
  
  return this._getEmp_JSON_WEB_TOKEN();
};

empSchema.methods._getEmp_JSON_WEB_TOKEN = function empSchema() {
  
  return jwt.sign(
    {
      name: this.name,
      mob: this.mob,
      position: this.position,
      dept: this.dept,
      sal: this.sal,
      status: this.status,
      role: this.role,
      email: this.email,
      SUPER_ADMIN:false, 
    },   
    process.env.JSONWT_SEC_KEY
  ); 
};


empSchema.methods._getAdmin_JSON_WEB_TOKEN = function empSchema(empID) {
  
  return jwt.sign(
    {
      id:empID,
      name: this.name,
      mob: this.mob,
      position: this.position,
      dept: this.dept,
      sal: this.sal,
      status: this.status,
      role: this.role,
      email: this.email,
      emailSent:this.emailSent,
      emailConfirmed:this.emailConfirmed,
      SUPER_ADMIN:false,  
    },  
    process.env.JSONWT_SEC_KEY
  ); 
};

const empModel = mongoose.model("emps", empSchema);
export default empModel;
