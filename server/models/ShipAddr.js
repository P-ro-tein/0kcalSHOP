const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipAddrSchema = Schema({
    userID: {
        type: String,
        maxlength: 50,
    },
    shipAddrName: {
        type: String,
        maxlength: 15,
    },
    shipAddrID: String, // 배송지 별명이 동일해도 다른 배송지일수도 있으니 ID로 확인하는 것도 있어야 할듯
    defaultShip: { // 기본 배송지 설정 여부
        type: Number,
        default: 0,
    },
    shipAddrDetail: {
        type: Array,
        default: [] // 첫번째엔 기본주소 두번째엔 우편번호, 세번째엔 상세주소
    },
    contactNumber: {
        type: String,
        default: '0'
    },
}, { timestamps: true })

const ShipAddr = mongoose.model('ShipAddr', shipAddrSchema);
module.exports = { ShipAddr }