const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { OrderList } = require("../models/OrderList");
const fs = require('fs');
const path = require('path');

// 유저 ID를 이용해 해당 ID가 포함된
// 주문 목록을 받아오기에 post요청 처리
router.post("/OrderList", (req, res) => {
    const orderList = new OrderList(req.body);

});