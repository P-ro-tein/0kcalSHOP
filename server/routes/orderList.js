const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { OrderList } = require("../models/OrderList");
const { Product } = require("../models/Product");
const fs = require("fs");
const path = require("path");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const bodyParser = require("body-parser");

// 주문 후, 주문내역을 넣음
router.post("/register", auth, (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const orderList = new OrderList(req.body);
  orderList.userID = req.user.id; // 현재 로그인한 ID로 주문내역 저장
  orderList.orderDate = new Date(); // 현재 시간으로 주문 내역시간 저장

  orderList.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/changeOrderState", auth, (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const orderList = new OrderList(req.body);
  orderList.userID = req.user.id; // 현재 로그인한 ID로 주문내역 확인
  /*
    OrderList.findOne(
        { userID: orderList.userID, orderProductID: orderList.orderProductID }, function (err, orderProduct){
            if (err) return res.status(400).json({success: false, err})
            console.log(orderProduct.orderState)
            let currentState = orderProduct.orderState;
            console.log(orderList.userID, currentState);
        }
    )
*/
  OrderList.findOneAndUpdate(
    { userID: orderList.userID, orderProductID: orderList.orderProductID },
    {
      $inc: {
        // number을 이용해서 state상태를 파악및 변경
        orderState: 1,
      },
    },
    { new: true },
    (err, orderProduct) => {
      if (!orderProduct)
        return res.json({
          success: false,
          message: "OrderList is not found",
        });
      return res.status(200).json({ success: true });
    }
  );
});

// 주문내역 조회
router.post("/list", auth, (req, res) => {
  let order = req.body.order ? req.body.order : "desc"; //주문 내역 표시 순서. default 내림차순. 오름차순으로 하고싶은경우 asc로 변경
  let sortBy = "orderDate"; // 주문날짜 기준 정렬
  // pagination을 위한 limit, skip 사용
  let limit = req.body.limit ? parseInt(req.body.limit) : 10; // default로 한 페이지에서 10개의 공지사항만 띄우도록 함.
  let skip = req.body.skip ? limit * (parseInt(req.body.pageNumber) - 1) : 0;
  // parseInt(req.body.skip) : 0; // 클라이언트에서 직접 skip을 넘겨주는 거 대신 페이지 번호를 넘겨받아 서버에서 계산
  // default 첫 페이지. 이후 페이지의 경우 skip = limit * (페이지 번호 -1) 하면 됨.

  let searchStartDate = new Date();
  const searchEndDate = new Date(); // 현재 시간까지 찾음

  if (req.body.periodCriterion === "today")
    searchStartDate.setHours(0, 0, 0, 0);
  else if (req.body.periodCriterion === "week") {
    searchStartDate.setDate(searchEndDate.getDate() - 7);
    searchStartDate.setHours(0, 0, 0, 0);
  } else if (req.body.periodCriterion === "month") {
    searchStartDate.setMonth(searchEndDate.getMonth() - 1);
    searchStartDate.setHours(0, 0, 0, 0);
  } else if (req.body.periodCriterion === "year") {
    searchStartDate.setFullYear(searchEndDate.getFullYear() - 1);
    searchStartDate.setHours(0, 0, 0, 0);
  }
  if (req.user.role === 1) {
    // 관리자인 경우
    OrderList.find({
      orderDate: { $gte: searchStartDate, $lte: searchEndDate }, // 오늘, 일주일전, 한달전, 1년전 0시부터 현재시간 까지의 주문내역
    })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, orderListInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          orderListInfo,
          postSize: orderListInfo.length,
        });
      });
  } else {
    //일반 고객인 경우
    OrderList.find({ userID: req.user.id }) // 해당 유저의 주문 내역만을 찾아서 전달
      .find({
        orderDate: { $gte: searchStartDate, $lte: searchEndDate }, // 오늘, 일주일전, 한달전, 1년전 0시부터 현재시간 까지의 주문내역
      })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, orderListInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          orderListInfo,
          postSize: orderListInfo.length,
        });
      });
  }
});

// 상품평 등록
// 주문 내역화면에서 상품평 버튼 클릭시 상품평이 Product DB에 등록
router.post("/reviewRegister", auth, (req, res) => {
  if (!req.user) {
    console.log("need login");
    res.status(200).json({ success: false, message: "need login" });
  }
  //먼저 User Collection에 해당 유저의 정보를 가져오기

  Product.findOne({ _id: req.body.orderProductID }, (err, productInfo) => {
    //가져온 정보에서 상품평이 이미 등록되어있는지 확인
    let duplicate = false;
    productInfo.reviews.forEach((item) => {
      if (item.userId === req.user._id) {
        duplicate = true;
      }
    });
    //상품평이 이미 있을때
    if (duplicate) {
      return res.status(200).json({ success: false });
    }
  });
  Product.findOneAndUpdate(
    { _id: req.body.orderProductID },
    {
      $push: {
        reviews: {
          userID: req.user.name,
          createdDate: Date.now(),
          productRecommand: req.body.productRecommand,
          shipRecommand: req.body.shipRecommand,
          starRating: req.body.starRating,
          description: req.body.description,
        },
      },
    },
    { new: true },
    (err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      console.log(productInfo);
      return res.status(200).json({ success: true });
    }
  );
});

// 특정 상품평 조회
router.get("/review_by_id", (req, res) => {
  let type = req.query.type;
  let reviewIds = req.query.id;

  if (type === "array") {
    //id=123123123,324234234,324234234 이거를
    //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
    let ids = req.query.id.split(",");
    noticeIds = ids.map((item) => {
      return item;
    });
  }

  Product.findOne({ _id: req.body.orderProductID }, (err, productInfo) => {
    // 가져온 정보에서 상품평이 이미 등록되어있는지 확인
    let duplicate = false;
    productInfo.reviews.forEach((item) => {
      if (item.id === req.user._id) {
        return res.status(200).json({
          success: true,
          item,
        });
      }
    });
    return res.status(200).json({ success: false });
  });
});

module.exports = router;
