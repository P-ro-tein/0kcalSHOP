const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Question } = require("../models/Question");
const fs = require('fs');
const path = require('path');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

// 질문 등록
// 중복체크 : 유저 ID와 주문결제 ID
// 클라이언트쪽에서 보내는 정보 : questionTitle, questionProductID, orderListProductID, questionDescription
router.post('/register', auth, (req, res) => {
    //받아온 정보들을 DB에 넣어 준다.
    console.log(req.body);
    const question = new Question(req.body);

    Question.findOne({ userID: req.user._id, orderListProductID: req.body.orderListProductID }, (err, question) => {
        if (!question) { // 해당 주문 건에 대하여 문의한 적이 없는 경우
            question.questionTitle = req.body.questionTitle;
            question.questionProductID = req.body.questionProductID;
            question.orderListProductID = req.body.orderListProductID;
            question.questionDescription = req.body.questionDescription;
            question.userID = req.user._id; // 현재 로그인한 ID로 문의 사항 저장

            question.save((err) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({success:true});
            })
        } else { // 해당 주문건에 대해 한 개라도 문의한 적이 있으면 리스트를 띄워줌
            let order = req.body.order ? req.body.order : "desc"; // default 내림차순. 오름차순으로 하고싶은경우 asc로 변경
            let sortBy = "createdDate"; // 문의사항 등록시간 기준으로만 정렬할 것이기 때문에 createdDate값으로 정렬
            // pagination을 위한 limit, skip 사용
            let limit = req.body.limit ? parseInt(req.body.limit) : 10; // default로 한 페이지에서 10개의 문의사항만 띄우도록 함
            let skip = req.body.skip ? limit * (parseInt(req.body.pageNumber)-1) : 0;
            // parseInt(req.body.skip) : 0; // 클라이언트에서 직접 skip을 넘겨주는 거 대신 페이지 번호를 넘겨받아 서버에서 계산
            // default 첫 페이지. 이후 페이지의 경우 skip = limit * (페이지 번호 -1) 하면 됨.

            Question
                .find({userID: req.user._id, orderListProductID: req.body.orderListProductID })
                .sort([[sortBy, order]])
                .skip(skip)
                .limit(limit)
                .exec((err, questionInfo) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).json({
                        success: true,
                        questionInfo,
                        postSize: questionInfo.length
                    })
                })
        }
    });
})

// 추가문의 버튼 클릭시 동작
router.post('/additionalRegister', auth, (req, res) => {
    //받아온 정보들을 DB에 넣어 준다.
    const question = new Question(req.body);
    question.questionTitle = req.body.questionTitle;
    question.questionProductID = req.body.questionProductID;
    question.orderListProductID = req.body.orderListProductID;
    question.questionDescription = req.body.questionDescription;
    question.userID = req.user._id; // 현재 로그인한 ID로 문의 사항 저장
    question.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({success:true});
    })
})

// 답변 등록
// 문의사항 리스트 중에서 questionID로 찾은뒤에 답변 적고 보내줌
// 클라이언트쪽에서 보내는 정보 : _id(문의게시글 고유ID), replyDescription
router.post('/questionReply', auth, (req, res) => {
    const question = new Question(req.body);
    if(req.user.role === 1 && req.body.replyState === 0) { // 관리자만 답변을 작성할 수 있도록 설정
        Question.findOneAndUpdate(
            // 공지 수정 시, 이미 클라이언트로 모든 정보를 보내줬고 다시 받을 때 변경하지 않았으면 그대로 다시 올 것이고
            // 수정되었다면 수정된 사항이 올것이기 때문에 그 정보를 바탕으로 questionID에 해당되는 DB에 그대로 등록
            { _id: req.body._id },
            {
                $set: {"replyState": 1,
                    "replyDescription": question.replyDescription,
                },
            },
            { new: true },
            (err, question) => {
                if (!question){console.log(req.body);
                    return res.json({ // 입력한 문의게시글 ID에 해당하는 공지 못찾음
                        success: false,
                        message: "Noitce is not found"
                    })};
                return res.status(200).json({success:true});
            });
    } else if(req.user.role === 1 && req.body.replyState === 1) {// 이미 답변을 등록한경우 질문과 답변을 같이 보여줘야함
        Question.findOne({ _id: req.body._id }, (err, question) => {
            if (!question)
                return res.json({ // questionID가 잘못 입력된 경우
                    success: false,
                    message: "ID not found"
                });

            res.status(200).json({ // 클라이언트로 questionID에 해당되는 모든 DB정보를 보낸다
                _id: question._id,
                questionTitle: question.questionTitle,
                createdDate: question.createdDate,
                questionProductID: question.questionProductID,
                orderListProductID: question.orderListProductID,
                questionDescription: question.questionDescription,
                userID : question.userID,
                replyState : question.replyState,
                replyDescription : question.replyDescription,
                additionalQuestionID : question.additionalQuestionID,
            });
        });
    }
});

// 문의사항 정렬
router.post('/list', (req, res) => {
    let order = req.body.order ? req.body.order : "desc"; // default 내림차순. 오름차순으로 하고싶은경우 asc로 변경
    let sortBy = "createdDate"; // 문의사항 등록시간 기준으로만 정렬할 것이기 때문에 createdDate값으로 정렬
    // pagination을 위한 limit, skip 사용
    let limit = req.body.limit ? parseInt(req.body.limit) : 10; // default로 한 페이지에서 10개의 문의사항만 띄우도록 함
    let skip = req.body.skip ? limit * (parseInt(req.body.pageNumber)-1) : 0;
    // parseInt(req.body.skip) : 0; // 클라이언트에서 직접 skip을 넘겨주는 거 대신 페이지 번호를 넘겨받아 서버에서 계산
    // default 첫 페이지. 이후 페이지의 경우 skip = limit * (페이지 번호 -1) 하면 됨.

    Question
        .find()
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, questionInfo) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({
                success: true,
                questionInfo,
                postSize: questionInfo.length
            })
        })
})

// 특정 문의사항 조회
router.get('/question_by_id', (req, res) => {

    let type = req.query.type
    let questionIds = req.query.id

    if (type === "array") {
        //id=123123123,324234234,324234234 이거를
        //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        noticeIds = ids.map(item => {
            return item
        })
    }

    //questionId를 이용해서 DB에서  questionId와 같은 정보를 가져온다.
    Question.find({ _id: { $in: questionIds } })
        .exec((err, question) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(question)
        })
})

module.exports = router;