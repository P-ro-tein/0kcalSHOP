const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderListSchema = Schema({
    userID: {
        type: String,
        maxlength: 50,
    },
    orderProductShipAddrID : String, // 주문시 선택한 배송지는 해당 유저와 강하게 연결되어 있으므로 계층적으로 안에 넣어야하나
    orderProductShipAddrName : String, // 프론트 화면에 해당 배송지 별명 표시
    orderDate : Date,
    orderProductID : String,
    orderProductPrice : Number, // 주문 내역이므로 총 가격은 프론트에서 합쳐서 보여주면될듯.
    orderState : {
        type : String,
        default : 'Payment Finished',
    }, // 현재 주문상태. 주문 내역에 추가될 때에는 결제가 정상적으로 처리된 직후이므로 데이터 추가시 기본값은 결제 완료.
}, { timestamps: true })

const OrderList = mongoose.model('OrderList', orderListSchema);
module.exports = { OrderList }