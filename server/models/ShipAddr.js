const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipAddrSchema = Schema({
    userID: {
        type: String,
        maxlength: 50,
        require: true
    },
    shipAddrName: {
        type: String,
        maxlength: 15,
        require: true
    },
    defaultShip: { // 기본 배송지 설정 여부
        type: Number,
        default: 0,
    },
    shipAddrRecipient: {
        type: String,
        require: true
    },
    shipAddrDetail: {
        type: Array,
        default: [], // 첫번째엔 기본주소 두번째엔 우편번호, 세번째엔 상세주소
        require: true
    },
    contactNumber: {
        type: String,
        default: '0'
    },
}, { timestamps: true })

const ShipAddr = mongoose.model('ShipAddr', shipAddrSchema);
module.exports = { ShipAddr }