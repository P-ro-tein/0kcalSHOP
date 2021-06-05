const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    shipCharge: {
        type: Number,
        default: 2500
    },
    images: {
        type: Array,
        default: []
    },
    remainStock:{
        type:Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0
    },
    deleted: { // 상품 삭제시, 실제로 DB에서 삭제하는 것이 아닌 보이지않게만 해야 하므로 해당 상품을 관리자가 삭제했는지 표시
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Array,
        default : [],
        // 상품평 작성 유저ID, 작성일자, 상품추천점수, 배송평가점수, 총 별점, 짧은글 후기
    }
}, { timestamps: true })

productSchema.index({
    title: 'text'
}, {
    weights: {
        title: 5
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }