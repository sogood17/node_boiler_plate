const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')

const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕'))

app.post('/register', (req, res) => {
  //회원가입 정보를 client에서 가져오면
  //데이터 베이스에 넣어준다.

  const user = new User(req.body)

  //몽고 DB메서드. user 정보가 user에 저장됨
  //구버전 코드(콜백함수)
  // user.save((err, doc) => {
  //   if(err) return res.json({success: false, err})
  //   return res.status(200).json({
  //   succes: true
  //   })
  // })

  user.save()
    .then((doc) => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
  });
})

app.post('/api/users/login', (req, res)=>{
  // const user = new User(req.body)
  //데이터베이스에서 요청된 이메일을 찾는다.
  User.findOne({ email: req.body.email })
  .then(docs => {
    if (!docs) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    docs.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."})
      
        //비밀번호가 맞다면 토큰을 생성한다.
        docs.generateToken((err, user)=>{
          if (err) return res.status(400).send(err);
          //토큰을 저장한다. 쿠키에 저장(cookieParser)
          res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
        })
      })
    })
      // user.comparePassword(req.body.password, (err, isMatch)=>{
      //   if(!isMatch)
      //     return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."})
      //   //비밀번호가 맞다면 토큰을 생성한다.
  
      //     user.generateToken((err, user) => {
      //       if (err) return res.status(400).send(err);
  
      //       //토큰을 저장한다. 쿠키에 저장(cookieparser)
      //       res.cookie('x_auth', user.token)
      //       .status(200)
      //       .json({ loginSuccess: true, userId: user._id })
      //     })
      // })

    .catch(err=>{
      return res.status(400).send(err);
      })
    })
  
  // , (err, user) => {
  //   if(!user) {
  //     return res.json({
  //       loginSuccess: false,
  //       message: "제공된 이메일에 해당하는 유저가 없습니다."
  //     })
  //   }
    //데이터 베이스에서 요청된 이메일이 있다면, 비밀번호가 맞는지 확인한다.

  // })

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))