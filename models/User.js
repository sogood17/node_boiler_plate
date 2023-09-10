const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10 
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

//db에 넣기 전
userSchema.pre('save', function(next) {
  const user = this;
    //사용자가 암호를 수정하거나 만들 때만 암호화 됨.
    if (user.isModified('password')) {
    //bcrypt를 사용한 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    //암호를 수정하지 않았을 때는 바로 db 저장 함수로 이동.
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  const user = this;

  //jsonwebtoken을 
  const token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token
  user.save()
  .then((users=>{
    return cb(null, users)
  }))
  .catch((err)=> {
    return cb(err)
  })
}

const User = mongoose.model('User', userSchema)


module.exports = {User}