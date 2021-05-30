const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderListSchema = Schema({
    userID: {
        type: String,
        maxlength: 50,
    },
    orderProductShipAddrID : String, // 주문시 선택한 배송지는 해당 유저와 강하게 연결되어 있으므로 계층적으로 안에 넣어야하나
    orderProductShipAddrName : String, // 주문시 선택한 배송지, 프론트 화면에 해당 배송지 별명 표시
    orderDate : {
        type:Date,
        default : Date.now(),
    }, // 주문 날짜
    orderProductID : String, // 주문 상품
    orderProductPrice : Number, // 상품 개별 금액. 주문 내역이므로 총 가격은 프론트에서 합쳐서 보여주면될듯.
    orderProductCount : Number, // 상품 주문 개수
    orderState : { // 1이면 결제완료, 2이면 배송중, 3이면 배송완료, 4이면 구매확정
        type : Number,
        default : 1,
    }, // 현재 주문상태. 주문상태에 따른 버튼은 클라이언트단에서 처리해야할 부분
    // 주문 내역에 추가될 때에는 결제가 정상적으로 처리된 직후이므로 데이터 추가시 기본값은 결제 완료.
})

const OrderList = mongoose.model('OrderList', orderListSchema);
module.exports = { OrderList }