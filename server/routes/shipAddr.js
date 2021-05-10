const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ShipAddr } = require("../models/ShipAddr");
const fs = require('fs');
const path = require('path');

// 배송지 목록을 유저 ID를 이용해 해당 ID가 포함된
// 배송지 목록을 받아오기에 post요청 처리
router.post("/shipAddr", (req, res) => {
    const shipAddr = new ShipAddr(req.body);

});