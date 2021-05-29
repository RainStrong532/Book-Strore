const validate = async (req, res, next) => {
    const data = req.body;

    if(!data.book_name || data.book_name.length === 0){
        return res.status(400).send({
            success: 0, message:"Yêu cầu có tên sách"
        })
    }

    if(!data.price){
        return res.status(400).send({
            success: 0, message:"Yêu cầu có giá sách"
        })
    }

    if(!data.quantity){
        return res.status(400).send({
            success: 0, message:"Yêu cầu có số lượng sách"
        })
    }

    if(!data.authors || data.authors.length === 0){
        return res.status(400).send({success: 0, message:"Yêu cầu thông tin tác giả"})
    }

    if(!data.categories || data.categories.length === 0){
        return res.status(400).send({success: 0, message:"Yêu cầu thông tin thể loại"})
    }

    next();
}

module.exports = {
    validate
}