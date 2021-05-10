const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Notice } = require("../models/Notice");
const fs = require('fs');
const path = require('path');

// 공지 ID를 이용해 공지를 받아오기에 post요청 처리
router.post("/Notice", (req, res) => {
    const notice = new Notice(req.body);

});