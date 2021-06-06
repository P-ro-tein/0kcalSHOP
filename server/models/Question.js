const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = Schema({
    createdDate: { // 문의사항 등록 일자
        type: Date,
        default: Date.now(),
    },
    questionTitle: { // 문의사항 제목
        type: String,
        maxlength: 50,
    },
    questionProductID: { // 문의한 상품 고유 ID (상품명 표시해야함)
        type: String,
        require:true,
    },
    orderListProductID:{ // 상품 주문 결제건의 고유 ID (주문내역이 포함되어야함)
        type: String,
    },
    questionDescription: { // 문의 사항 글
        type: String,
        maxlength: 150,
    },
    userID: { // 문의 유저 ID
        type: String,
        maxlength: 50,
    },
    replyState: { // 0이면 미답변, 1이면 답변완료
        type : Number,
        default : 0,
    },
    replyDescription: { // 답변 내용
        type : String,
        default : "",
    },
    additionalQuestionID:{ // 추가 문의한 질문 ID 보내줌 (다음 질문)
        type: String,
        default: "",
    },
})

const Question = mongoose.model('Question', questionSchema);
module.exports = { Question }