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
    console.log(req.body);
    const shipAddr = new ShipAddr(req.body);
    shipAddr.shipAddrDetail[0] = req.body.roadAddress;
    shipAddr.shipAddrDetail[1] = req.body.postcode;
    shipAddr.shipAddrDetail[2] = req.body.detailAddress;
    shipAddr.userID = req.user. id; // 현재 로그인한 ID로 배송지 정보 저장

    shipAddr.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({success:true});
    })
})

router.post('/setDefault',auth, (req ,res) => {
    const shipAddr = new ShipAddr(req.body);
    shipAddr.userID = req.user.id; // 현재 로그인한 ID로 배송지 정보 저장
    if(shipAddr.defaultShip == 1){
        // 기본 배송지가 현재 설정되어있는 경우 기존 기본배송지 설정값을 0으로 업데이트하고
        // User의 기본 배송지명을 업데이트 하고, 새로운 기본배송지 설정값을 0으로 설정하여
        // 새로운 기본 배송지를 설정 해줘야한다
        ShipAddr.findOneAndUpdate({userID: shipAddr.userID, "defaultShip": 1},
            {$inc:{"defaultShip": -1}}, // 기존의 기본 배송지의 기본 설정 해제
            { new: true },
            (err, shipInfo) => {
                ShipAddr.findOneAndUpdate({ _id: shipAddr._id },
                    {$inc:{"defaultShip": 1}},
                    {new: true },
                    (err, shipAddrInfo) => {
                        User.findOneAndUpdate({id: shipAddrInfo.userID}, // 유저 모델에서 해당 유저를 찾아 기본 배송지명 변경
                            {$set: {"defaultShipAddrName": shipAddrInfo.shipAddrName}},
                            { new: true },
                            (err, userInfo) => {
                                if (!userInfo)
                                    return res.json({
                                        success: false,
                                        message: "shipAddr is not found"
                                    });
                                    return res.status(200).json({success:true});
                            });
                    }
                )
            })
        
    }
})

router.post('/modifyShipAddr',auth, function(req, res) {
        const shipAddr = new ShipAddr(req.body);
        shipAddr.shipAddrDetail[0] = req.body.roadAddress;
        shipAddr.shipAddrDetail[1] = req.body.postcode;
        shipAddr.shipAddrDetail[2] = req.body.detailAddress;
        shipAddr.userID = req.user.id; // 현재 로그인한 ID로 배송지 정보 저장

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

router.post('/removeShipAddr', auth, (req, res) => {
    ShipAddr.deleteOne({ 
        userID: req.user.id, 
        _id: req.body._id
    }, (err, shipAddrInfo)=>{
        if(err) return res.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true
        })
    });
});

// 배송지 조회
router.post('/list', auth, (req, res) => {
    const shipAddr = new ShipAddr(req.body);
    let order = req.body.order ? req.body.order : "desc"; // default 내림차순. 오름차순으로 하고싶은경우 asc로 변경
    let sortBy = req.body.sortBy ? req.body.sortBy:"shipAddrName"; // 배송지 이름 기준 정렬

        ShipAddr
            .find({"userID": req.user.id})
            .sort([[sortBy, order]])
            .exec((err, shipAddrInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                User.findOneAndUpdate({"id":req.user.id},
                {$set:{"defaultShipAddrName": shipAddrInfo.shipAddrName}}, (err, userInfo) => {
                    if(err) return res.status(400).json({success: false, err });
                    return res.status(200).json({
                        success: true,
                        shipAddrInfo,
                        postSize: shipAddrInfo.length
                    })
                })
            })
})

module.exports = router;