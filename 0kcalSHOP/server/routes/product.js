const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");
const fs = require('fs');
const path = require('path');
//=================================
//             Product
//=================================

try{ // fs.readdirSync()함수로 폴더가 존재하는지 확인하고, 없으면 fs.mkdirSync()함수로 폴더를 생성
    fs.readdirSync('uploads');
}catch(error){
    console.error('uploads폴더 생성');
    fs.mkdirSync('uploads');
}

// 업로드 파일 이름 유지를 위해 multer에 storage 세팅을 해줘야 하는데 이때 사용될 변수.
// 업로드 파일명과 서버 파일명이 동일하게 되면 중복파일 업로드에서 문제가 생길 수 있으니 파일명 앞에 시간을 정수로 달아줌
// 즉 똑같은 파일명이 업로드되더라도 앞에 시간 정수가 있기 때문에 구별
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

// 앞에서 만든 storage를 넣어서 저장될 파일의 이름을 유지하는 upload 미들웨어.
// 하나의 파일을 처리하기 위해 .single()을 사용
// .single()에는 html form에서 사용된 파일 input 필드의 이름(name)이 삽입.
var upload = multer({ storage: storage }).single("images")

/* 프론트에서 사진 요청시 이용할 수 도 있는 코드
router.use('/img',express.static(path.resolve(__dirname,'../uploads')));
router.post('/image', (req, res) => {
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})*/

// 폼 액션이 /product/register
router.post('/register',upload, (req, res) => {
    //받아온 정보들을 DB에 넣어 준다.
    const product = new Product(req.body)
    // single이니까 file 속성 안에 filename이 들어있으므로 안넘겨져서 그냥 타이틀사진을 그냥 넣어버렸다
    // 몇 장 사진이 추가되면 for문 돌리든지..나중에 방법을 강구해보자.
    product.images[0] = req.file.filename;
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({success:true});
    })
})

router.post('/products', (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    // product collection에 들어 있는 모든 상품 정보를 가져오기 
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            console.log('key', key)

            if (key === "price") {
                findArgs[key] = {
                    //Greater than equal
                    $gte: req.body.filters[key][0],
                    //Less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }

        }
    }


    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            })
    } else {
        Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            })
    }

})

//id=123123123,324234234,324234234  type=array
router.get('/products_by_id', (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        //id=123123123,324234234,324234234 이거를 
        //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })
    }

    //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.
    Product.find({ _id: { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })

})


module.exports = router;