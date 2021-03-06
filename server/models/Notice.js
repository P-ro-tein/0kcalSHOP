const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = mongoose.Schema({
    noticeTitle: {
        type: String,
        maxlength: 50,
        require:true
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        default: Date.now(),
    },
    expiredDate: {
        type: Date,
    },
    description: { // 공지 자세한 내용 입력
        type: String,
    },
    images: {
        type: Array,
        default: []
    },
    deleted: { // 상품 삭제시, 실제로 DB에서 삭제하는 것이 아닌 보이지않게만 해야 하므로 해당 상품을 관리자가 삭제했는지 표시
        type: Number,
        default: 0,
    },
});

noticeSchema.index({noticeTitle: 'text'});

const Notice = mongoose.model('Notice', noticeSchema);
module.exports = { Notice }