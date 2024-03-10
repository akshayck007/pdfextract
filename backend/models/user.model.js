import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: "true",
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: "true",
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    trim: "true",
  },
  library: [{ type: mongoose.Schema.Types.ObjectId, ref: "PDF" }],
});

const User = mongoose.model("User", userSchema);

export default User;
