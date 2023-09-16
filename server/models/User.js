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

  //jsonwebtoken을 이용해서 token을 생성하기
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

userSchema.statics.findByToken = function(token, cb) {
  const user = this;

  //토큰을 decode 한다.
  jwt.verify(token, 'secretToken', function(err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id": decoded, "token": token})
    .then(users => {
      cb(null, users)
    })
    .catch(err => {
      cb(err)
    })
    // , function(err, user){

    //   if (err) return cb(err);
    //   cb(null, user)
    // })
  })

}

const User = mongoose.model('User', userSchema)


module.exports = {User}