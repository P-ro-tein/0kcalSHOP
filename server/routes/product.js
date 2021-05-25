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
var upload = multer({ storage: storage }).array("images")

// 폼 액션이 /product/register
router.post('/register',upload, (req, res) => {
    //받아온 정보들을 DB에 넣어 준다.
    const product = new Product(req.body)
    // single이니까 file 속성 안에 filename이 들어있으므로 안넘겨져서 그냥 타이틀사진을 그냥 넣어버렸다
    // 몇 장 사진이 추가되면 for문 돌리든지..나중에 방법을 강구해보자.
   for(let i=0 ; i<req.files.length; i+=1){
       product.images[i]=req.files[i].filename
    }
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({success:true});
    })
})

router.route('/modifyProduct') // 상품 정보 수정시, 클라이언트로 현재 선택한 공지의 콘텐츠들을 보내고 다시 POST로 받는다
    .get(function(req, res) {
        Product.findOne({ _id: req.body._id }, (err, product) => {
            if (!product)
                return res.json({ // ProductID가 잘못 입력된 경우
                    success: false,
                    message: "ID not found"
                });

            res.status(200).json({ // 클라이언트로 상품 고유ID에 해당되는 모든 DB정보를 보낸다
                _id : product._id,
                title : product.title,
                category : product.category,
                description : product.description,
                price : product.price,
                images : product.images,
                stock : product.stock,
                sold : product.sold,
                deleted : product.deleted,
                views : product.views,
                createdDate: product.createdDate,
                updatedDate: product.updatedDate
            });
        });
    })
    .post(function(req, res) {
        const product = new Product(req.body);

        Product.findOneAndUpdate(
            // 상품 수정 시, 이미 클라이언트로 모든 정보를 보내줬고 다시 받을 때 변경하지 않았으면 그대로 다시 올 것이고
            // 수정되었다면 수정된 사항이 올것이기 때문에 그 정보를 바탕으로 상품 고유ID에 해당되는 DB에 그대로 등록
            { _id: req.body._id },
            {
                $set: {"updatedDate": Date.now(),
                    "title": product.title,
                    "category": product.category,
                    "description" : product.description,
                    "price" : product.price,
                    "images" : product.images
                    // 재고량, 판매량, 조회수는 수정하지 않도록 함
                },
            },
            { new: true },
            (err, product) => {
                if (!product)
                    return res.json({ // 입력한 공지 ID에 해당하는 공지 못찾음
                        success: false,
                        message: "Product is not found"
                    });
                return res.status(200).json({success:true});
            });
    });

// 상품 삭제버튼 클릭시 동작
// 실제로 DB에서 삭제하면 안되고 삭제 처리만 해야하므로 deleted의 값만 1로 변경
router.post('/removeProduct', (req, res) => {
    Product.findOneAndUpdate({ _id: req.body._id },
        { $set: {"deleted": 1}},
        { new: true },
        (err, product) => {
            if (!product)
                return res.json({ // 입력한 공지 ID에 해당하는 공지 못찾음
                    success: false,
                    message: "Product is not found"
                });
            return res.status(200).json({success:true});
        });
});

// 상품 리스트 조회
router.post('/products', (req, res) => {
    let order = req.body.order ? req.body.order : "asc"; // default 오름차순.(낮은 가격순) 내림차순으로 하고싶은경우 asc로 변경
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id"; // default _id값으로 정렬
    // pagination을 위한 limit, skip 사용
    let limit = req.body.limit ? parseInt(req.body.limit) : 16; // default로 한 페이지에서 16개의 상품만 띄우도록 함.
    let skip = req.body.skip ? limit * (parseInt(req.body.pageNumber)-1) : 0;
    // default 첫 페이지. 이후 페이지의 경우 skip = limit * (페이지 번호 -1) 하면 됨.

    let term = req.body.searchTerm // 상품 검색을 위한 부분
    let category = req.body.category ? req.body.category : ["식단세트","식사대용","건강간식"];
    let findArgs = {};

    let leastPrice = req.body.leastPrice;
    let highestPrice = req.body.highestPrice;

    for (let key in req.body.filters) { // 가격 필터링
        if (req.body.filters[key]) { // length가 1보다 클때 작동하는게 안에 들어있으면 동작하는것 이었던것 같은데 제대로 동작안해서 그냥 삭제
            console.log('key', key)
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    //Less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]; // 필터의 필드에 대한 값과 일치하는 것들을 넣어줌
            }
            console.log(findArgs[key])
        }
    }

    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .find({
                "deleted" : 0, // 삭제 처리되지 않은 상품 로드
                "category" : category,
            })
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true,
                    productInfo,
                    postSize: productInfo.length
                })
            })
    } else {
        Product
            .find(findArgs)
            .find({
                "deleted" : 0, // 삭제 처리되지 않은 상품 로드
                "category" : category,
            })
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true,
                    productInfo,
                    postSize: productInfo.length
                })
            })
    }
})

// 상품 상세정보를 들어갈때 주소뒤에 쿼리로 질의가 오면 해당 상품의 정보를 보내준다
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