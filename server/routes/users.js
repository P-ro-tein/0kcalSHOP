const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const { Product } = require("../models/Product");

//회원가입 post요청 처리
router.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err }); // 실패하면 false, err 보내기
        return res.status(200).json({
            success: true // 성공하면 success: true 보내기
        });
    });
});

//로그인 post요청 처리
router.post('/login', (req, res) => {
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user)
            return res.json({ // 사용자가 입력한 ID 미존재로 로그인 실패
                loginSuccess: false,
                message: "Auth failed, ID not found"
            });
        user.comparePassword(req.body.password, (err, isMatch) => { // ID가 있으면 password 비교
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" }); // 비밀번호 불일치

            user.generateToken((err, user) => { // 성공하면 Token 생성 -> 쿠키 저장 -> 쿠키를 사용자에 전송
                if (err) return res.status(400).send(err);
                res
                    .cookie("x_auth", val = user.token) // 사용자의 Token을 x_auth 이름으로 저장
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

//auth 가져와 토큰으로 확인
router.get('/auth', auth, (req, res) => {
    //auth 미들웨어를 통과한 상태 이므로
    //req.user에 user값을 넣어줬으므로
    res.status(200).json({
        _id: req._id,
        id: req.id,
        isAdmin: req.user.role === 0? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        defualtShipAddrName : req.usr.defualtShipAddrName
    });
  });

//logout 요청처리
router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: ""}, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true // 로그인 성공 전송
        });
    });
});


router.post("/checkId", (req,res) => {
    User.findOne({id: req.body.id}, (err, user) => {
        if(!user){
            return res.json({ available: true});
        }
        else{
            return res.json({available: false});
        }
    });
});

router.post("/checkEmail", (req,res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({ available: true});
        }
        else{
            return res.json({available: false});
        }
    });
});

router.post("/addToCart", auth, (req, res) => {

    //먼저  User Collection에 해당 유저의 정보를 가져오기 
    User.findOne({ _id: req.user._id },
        (err, userInfo) => {

            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인 

            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            })

            //상품이 이미 있을때
            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.user._id, "cart.id": req.body.productId },
                    { $inc: { "cart.$.quantity": 1 } },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(200).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            //상품이 이미 있지 않을때 
            else {
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
        })
});


router.post('/removeFromCart', auth, (req, res) => {

    //먼저 cart안에 내가 지우려고 한 상품을 지워주기 
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.body.productId } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            //product collection에서  현재 남아있는 상품들의 정보를 가져오기 

            //productIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
            Product.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
})

module.exports = router;