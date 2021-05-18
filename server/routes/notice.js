const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Notice } = require("../models/Notice");
const fs = require('fs');
const path = require('path')
const uuidGenerator = require('../util/uuid')

try{ // fs.readdirSync()함수로 폴더가 존재하는지 확인하고, 없으면 fs.mkdirSync()함수로 폴더를 생성
    fs.readdirSync('noticeImageUploads');
}catch(error){
    console.error('noticeImageUploads 생성');
    fs.mkdirSync('noticeImageUploads');
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'noticeImageUploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
var upload = multer({ storage: storage }).single("images")

router.post('/register', upload,(req, res) => {
    //받아온 정보들을 DB에 넣어 준다.
    const notice = new Notice(req.body)
    notice.noticeID = uuidGenerator.uuidv4(); // 공지의 고유 ID를 랜덤 생성해서 넣어준다
    notice.images[0] = req.file.filename;
    if(!notice.expiredDate) { // 공지 유효기간 미설정시, 등록 날짜 기준 자동으로 한 달뒤로 설정되도록 작성
        const currentDate = new Date();
        notice.expiredDate = currentDate.setMonth(currentDate.getMonth() + 1);
    }
    notice.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({success:true});
    })
})
router.route('/modifyNotice') // 공지 수정시, 클라이언트로 현재 선택한 공지의 콘텐츠들을 보내고 다시 POST로 받는다
    .get(function(req, res) {
        Notice.findOne({ noticeID: req.body.noticeID }, (err, notice) => {
            if (!notice)
                return res.json({ // NoticeID가 잘못 입력된 경우
                    success: false,
                    message: "ID not found"
                });

            res.status(200).json({ // 클라이언트로 noticeID에 해당되는 모든 DB정보를 보낸다
                _id: notice._id,
                noticeTitle: notice.noticeTitle,
                noticeID: notice.noticeID,
                createdDate: notice.createdDate,
                updatedDate: notice.updatedDate,
                expiredDate: notice.expiredDate,
                description: notice.description,
                images : notice.images,
                deleted : notice.deleted
            });
        });
    })
    .post(function(req, res) {
        const notice = new Notice(req.body);
        if(!notice.expiredDate) { // 공지 유효기간 미설정시, 업데이트 날짜 기준 자동으로 한 달뒤로 설정되도록 작성
            const currentDate = new Date();
            notice.expiredDate = currentDate.setMonth(currentDate.getMonth() + 1);
        }

        Notice.findOneAndUpdate(
            // 공지 수정 시, 이미 클라이언트로 모든 정보를 보내줬고 다시 받을 때 변경하지 않았으면 그대로 다시 올 것이고
            // 수정되었다면 수정된 사항이 올것이기 때문에 그 정보를 바탕으로 noticeID에 해당되는 DB에 그대로 등록

            { noticeID: req.body.noticeID },
            {
                $set: {"updatedDate": Date.now(),
                    "noticeTitle": notice.noticeTitle,
                    "expiredDate": notice.expiredDate,
                    "description": notice.description,
                    "images" : notice.images
                    },
            },
            { new: true },
            (err, notice) => {
                if (!notice)
                    return res.json({ // 입력한 공지 ID에 해당하는 공지 못찾음
                        success: false,
                        message: "Noitce is not found"
                    });
                return res.status(200).json({success:true});
        });
    });

// 공지 삭제버튼 클릭시 동작
// 실제로 DB에서 삭제하면 안되고 삭제 처리만 해야하므로 deleted의 값만 1로 변경
router.post('/removeNotice', (req, res) => {
    Notice.findOneAndUpdate({ noticeID: req.body.noticeID },
        { $set: {"deleted": 1}},
        { new: true },
        (err, notice) => {
        if (!notice)
            return res.json({ // 입력한 공지 ID에 해당하는 공지 못찾음
                success: false,
                message: "Noitce is not found"
            });
        return res.status(200).json({success:true});
    });
});

module.exports = router;