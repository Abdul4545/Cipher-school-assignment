const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },


  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  }

});


userSchema.methods.verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
}


userSchema.pre('save', async function (next) {

  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  }

  else {
    next()
  }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel