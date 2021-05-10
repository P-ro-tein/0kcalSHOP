const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  id: { //사용자 로그인 ID
    type : String,
    maxlength: 15,
  },
  userName: { // 사용자 이름
    type: String,
    maxlength: 8,
  },
  email: { // 사용자 이메일 주소
    type: String,
    trim: true, //dhsdb 1541 @naver.com 을 dhsdb1541@naver.com로 trim
    unique: 1,
  },
  password: { // 사용자 로그인 비밀번호
    type: String,
    minLength: 5,
  },
  role: { // 관리자, 사용자 구분
    type: Number,
    default: 0,
  },
  defualtShipAddrName : { // 상품 상세정보에서 바로 해당 유저의 기본 주소를 보여주기위해 유저 DB에 삽입
    type: String,
    maxlength : 15,
  },
  token: {
    type: String,
  },
});

//save 메소드가 실행되기전에 비밀번호를 암호화하는 로직을 짜야한다
userSchema.pre("save", function (next) {
  let user = this;

  //model 안의 paswsword가 변환될때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), 'secret')

  user.token = token;
  user.save(function (err, user) {
      if (err) return cb(err)
      cb(null, user);
  })
}

userSchema.statics.findByToken = function (token) {
  let user = this;
  //secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
  //Db에 접근해서 유저의 정보를 가져온다
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };