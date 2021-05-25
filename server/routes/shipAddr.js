const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ShipAddr } = require("../models/ShipAddr");
const fs = require('fs');
const path = require('path');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');


router.post('/register', auth, (req, res) => {
    //받아온 정보들을 DB에 넣어 준다.
    const shipAddr = new ShipAddr(req.body);
    shipAddr.shipAddrDetail[0] = req.body.roadAddress;
    shipAddr.shipAddrDetail[1] = req.body.postcode;
    shipAddr.shipAddrDetail[2] = req.body.detailAddress;
    shipAddr.userID = req.user.id; // 현재 로그인한 ID로 배송지 정보 저장

    if(shipAddr.defaultShip == 1){
        // 기본 배송지가 현재 설정되어있는 경우 기존 기본배송지 설정값을 0으로 업데이트하고
        // User의 기본 배송지명을 업데이트 하고, 새로운 기본배송지 설정값을 0으로 설정하여
        // 새로운 기본 배송지를 설정 해줘야한다
        ShipAddr.findOneAndUpdate({userID: shipAddr.userID, defaultShip: 1},
            {$set: {"defaultShip": "0"}}, // 기존 기본 배송지를 기본 배송지에서 해제
            { new: true },
            (err, shipInfo) => {
                if (!shipInfo) // 기본 배송지가 애초에 설정이 안되어있던 경우
                    console.log("Default ShipAddress is not found");
            });
        User.findOneAndUpdate({id: shipAddr.userID}, // 유저 모델에서 해당 유저를 찾아 기본 배송지명 변경
            {$set: {"defualtShipAddrName": shipAddr.shipAddrName}},
            { new: true },
            (err, userInfo) => {
                if (!userInfo)
                    return res.json({ // 유저ID를 못찾은 경우
                        success: false,
                        message: "User is not found"
                    });
            });
    }
    shipAddr.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({success:true});
    })
})

router.route('/modifyShipAddr') // 배송지 수정 기능
    .get(auth, function(req, res) {
        ShipAddr.findOne({ userID: req.user.id, _id: req.body._id }, (err, shipAddr) => {
            console.log(req.user.id, req.body._id)
            if (!shipAddr)
                return res.json({ // 전달받은 배송지 ID, 유저ID 가 존재하지 않는 경우
                    success: false,
                    message: "ID not found"
                });

            res.status(200).json({ // 클라이언트로 shipAddrID에 해당되는 모든 DB정보를 보낸다
                _id: shipAddr._id,
                userID : shipAddr.userID,
                shipAddrName: shipAddr.shipAddrName,
                defaultShip: shipAddr.defaultShip,

                roadAddress : shipAddr.shipAddrDetail[0],
                postcode : shipAddr.shipAddrDetail[1],
                detailAddress : shipAddr.shipAddrDetail[2],
                contactNumber: shipAddr.contactNumber
            });
        });
    })

    .post(auth, function(req, res) {
        const shipAddr = new ShipAddr(req.body);
        shipAddr.shipAddrDetail[0] = req.body.roadAddress;
        shipAddr.shipAddrDetail[1] = req.body.postcode;
        shipAddr.shipAddrDetail[2] = req.body.detailAddress;
        shipAddr.userID = req.user.id; // 현재 로그인한 ID로 배송지 정보 저장

        //중복코드 리팩토링 필요
        if(shipAddr.defaultShip == 1){
            // 기본 배송지가 현재 설정되어있는 경우 기존 기본배송지 설정값을 0으로 업데이트하고
            // User의 기본 배송지명을 업데이트 하고, 새로운 기본배송지 설정값을 0으로 설정하여
            // 새로운 기본 배송지를 설정 해줘야한다
            ShipAddr.findOneAndUpdate({userID: shipAddr.userID, defaultShip: "1"},
                {$set: {"defaultShip": "0"}}, // 기존의 기본 배송지의 기본 설정 해제
                { new: true },
                (err, shipInfo) => {
                    if (!shipInfo) // 기본 배송지가 애초에 설정이 안되어있던 경우
                        console.log("Default ShipAddress is not found");
                });
            User.findOneAndUpdate({id: shipAddr.userID}, // 유저 모델에서 해당 유저를 찾아 기본 배송지명 변경
                {$set: {"defualtShipAddrName": shipAddr.shipAddrName}},
                { new: true },
                (err, userInfo) => {
                    if (!userInfo)
                        return res.json({ // 유저ID를 못찾은 경우
                            success: false,
                            message: "User is not found"
                        });
                });
        }
        
        ShipAddr.findOneAndUpdate(
            // 배송지 수정 시, 이미 클라이언트로 모든 정보를 보내줬고 다시 받을 때 변경하지 않았으면 그대로 다시 올 것이고
            // 수정되었다면 수정된 사항이 올것이기 때문에 그 정보를 바탕으로 shipAddrID에 해당되는 DB에 그대로 등록
            { userID: shipAddr.userID, _id: shipAddr._id },
            {
                $set: {
                    "shipAddrRecipient" : shipAddr.shipAddrRecipient,
                    "shipAddrName": shipAddr.shipAddrName,
                    "defaultShip": shipAddr.defaultShip,
                    "shipAddrDetail": shipAddr.shipAddrDetail,
                    "contactNumber" : shipAddr.contactNumber
                },
            },
            { new: true },
            (err, shipAddrInfo) => {
                if (!shipAddrInfo)
                    return res.json({
                        success: false,
                        message: "shipAddr is not found"
                    });
                return res.status(200).json({success:true});
            });
    });

router.delete('/removeShipAddr', auth, (req, res) => {
    ShipAddr.deleteOne( { userID: req.user.id, _id: req.body._id},
        function(err, shipAddrInfo) {
        console.log(shipAddrInfo)
    });
});

// 배송지 조회
router.get('/list', auth, (req, res) => {
    const shipAddr = new ShipAddr(req.body);
    let order = req.body.order ? req.body.order : "desc"; // default 내림차순. 오름차순으로 하고싶은경우 asc로 변경
    let sortBy = "shipAddrName"; // 배송지 이름 기준 정렬

        ShipAddr
            .find({"userID": req.user.id})
            .exec((err, shipAddrInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true,
                    shipAddrInfo,
                    postSize: shipAddrInfo.length
                })
            })
})

module.exports = router;