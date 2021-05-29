'use strict';

const Book = require('../../data/book');
const Image = require('../../data/image');

const columns = ['book_id', 'book_name', 'description', 'quantity', 'price', 'discount', 'publish_year'];
const sortType = ['ASC', 'DESC'];

const findAll = async (req, res, next) => {
    let page_number = parseInt(req.query.page_number) || 0;
    let page_size = parseInt(req.query.page_size) || 20;
    let text_search = req.query.text_search || '';
    let sort_by = req.query.sort_by || "ASC";
    let order_by = req.query.order_by || "book_id";

    let col = columns.filter(item => item == order_by);
    if (col.length === 0)
        return res.status(400).send({ success: 0, message: "order_by không hợp lệ" });

    let sort = sortType.filter(item => item == sort_by);
    if (sort.length === 0) return res.status(400).send({ success: 0, message: "sort_by không hợp lệ" });;

    let pattern = '%' + text_search + '%';

    if (!Number.isInteger(page_number) || !Number.isInteger(page_size)) {
        return res.status(400).send({
            success: 0,
            message: 'pag_size or page_number không hợp lệ'
        })
    }

    try {
        let result = await Book.findAll(pattern, order_by, sort_by);
        let total = Math.ceil(result.length / page_size);
        result = result.splice(page_number * page_size, page_size);
        let url = new URL(`${process.env.HOST_URL}/api/app/books`);
        if (text_search.length > 0) {
            url.searchParams.set('text_search', text_search);
        }
        if (sort_by !== 'ASC') {
            url.searchParams.set('sort_by', 'DESC');
        }

        if (order_by !== columns[0]) {
            url.searchParams.set('order_by', order_by);
        }

        url.searchParams.set('page_size', page_size);

        let nextUrl = null, prevUrl = null;
        if (page_number < total - 1) {
            url.searchParams.set('page_number', page_number + 1);
            nextUrl = url.href;
        }
        if (page_number > 0) {
            url.searchParams.set('page_number', page_number - 1);
            prevUrl = url.href;
        }

        res.status(200).send({
            success: 1,
            total,
            prev: prevUrl,
            next: nextUrl,
            current: page_number,
            data: result,
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const findById = async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        let result = await Book.findById(id);
        let images = await Book.findAllImages(result.book_id);
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                let rs = await Image.findById(images[i].image_id);
                rs[0].url = rs[0].url = config.url + "/public/images/" + rs[0].image_name;
                images[i] = {...images[i], ...rs[0]};
            }
        }
        result = {...result, images};
        res.status(200).send({
            success: 1,
            data: result,
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const saveBook = async (req, res, next) => {

    const data = req.body;

    try {
        const book = await Book.save(data);

        if (!book.book_id) {
            return res.status(400).send({ success: 0, message: "Tạo thất bại" })
        }

        if (data.images) {
            data.images.forEach(
                async (image) => {
                    await Book.saveImage({ book_id: book.book_id, image_id: image.image_id });
                }
            )
        }
        return res.status(200).send({ success: 1, data: { book_id: book.book_id } });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const deleteBook = async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        await Book.deleteBook(id);
        res.status(200).send({
            success: 1
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const findImage = async (req, res) => {
    let { book_id, image_id } = req.params;
    try {
        let result = await Book.findImage({ image_id, book_id });
        if (result.length === 1) {
            let image = await Image.findById(image_id);
            image[0].url = config.url + "/public/images/" + image[0].name;

            let data = {
                ...result[0],
                ...image[0]
            }
            res.status(200).send({
                success: 1,
                data: data,
            })
        } else {
            res.status(400).send({
                success: 0,
                message: "Không có ảnh này"
            })
        }
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const deleteImage = async (req, res) => {
    let { book_id, image_id } = req.params;
    try {
        await Book.deleteImage({ book_id, image_id });
        res.status(200).send({
            success: 1
        })
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const saveImage = async (req, res) => {
    let { book_id } = req.params;
    let { image_id } = req.body;
    try {
        const rs = await Book.existedImage({ book_id, image_id });
        const { isExisted } = rs[0];
        if (isExisted == '0') {
            await Book.saveImage({ book_id, image_id });
            res.status(200).send({
                success: 1
            })
        } else {
            res.status(400).send({ success: 0, message: "Ảnh đã tồn tại" });
        }
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const findAllImage = async (req, res, next) => {
    const { book_id } = req.params;
    try {
        const result = await Book.findAllImages(book_id);
        let data = [];
        for (let i = 0; i < result.length; i++) {
            let rs = await Image.findById(result[i].image_id);
            rs[0].url = config.url + "/public/images/" + rs[0].name;
            data.push(rs[0]);
        }
        res.status(200).send({
            success: 1,
            data: data,
        })
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const update = async (req, res, next) => {
    let data = req.body;
    const { book_id } = req.params;
    try {
        const rs = await Book.findById(book_id);
        if (rs.book_id) {
            let d = { ...rs, ...data };
            await Book.update(d, book_id);
            return res.status(200).send({ success: 1 });
        } else {
            res.status(404).send({ success: 0, message: "Không tìm thấy sách" });
        }
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}


const findByCategoryId = async (req, res, next) => {
    let page_number = parseInt(req.query.page_number) || 0;
    let page_size = parseInt(req.query.page_size) || 20;
    let text_search = req.query.text_search || '';
    let sort_by = req.query.sort_by || "ASC";
    let order_by = req.query.order_by || "book_id";

    let col = columns.filter(item => item == order_by);
    if (col.length === 0)
        return res.status(400).send({ success: 0, message: "order_by không hợp lệ" });

    let sort = sortType.filter(item => item == sort_by);
    if (sort.length === 0) return res.status(400).send({ success: 0, message: "sort_by không hợp lệ" });;

    let pattern = '%' + text_search + '%';

    if (!Number.isInteger(page_number) || !Number.isInteger(page_size)) {
        return res.status(400).send({
            success: 0,
            message: 'pag_size or page_number không hợp lệ'
        })
    }
    let category_id = parseInt(req.params.category_id);
    if (!Number.isInteger(category_id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        let result = await Book.findByCategory(pattern, order_by, sort_by, category_id);
        let total = Math.ceil(result.length / page_size);
        result = result.splice(page_number * page_size, page_size);
        res.status(200).send({
            success: 1,
            total,
            data: result,
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const findByAuthorId = async (req, res, next) => {
    let page_number = parseInt(req.query.page_number) || 0;
    let page_size = parseInt(req.query.page_size) || 20;
    let text_search = req.query.text_search || '';
    let sort_by = req.query.sort_by || "ASC";
    let order_by = req.query.order_by || "book_id";

    let col = columns.filter(item => item == order_by);
    if (col.length === 0)
        return res.status(400).send({ success: 0, message: "order_by không hợp lệ" });

    let sort = sortType.filter(item => item == sort_by);
    if (sort.length === 0) return res.status(400).send({ success: 0, message: "sort_by không hợp lệ" });;

    let pattern = '%' + text_search + '%';

    if (!Number.isInteger(page_number) || !Number.isInteger(page_size)) {
        return res.status(400).send({
            success: 0,
            message: 'pag_size or page_number không hợp lệ'
        })
    }
    let author_id = parseInt(req.params.author_id);
    if (!Number.isInteger(author_id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        let result = await Book.findByAuthor(pattern, order_by, sort_by, author_id);
        let total = Math.ceil(result.length / page_size);
        result = result.splice(page_number * page_size, page_size);
        res.status(200).send({
            success: 1,
            total,
            data: result,
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

module.exports = {
    findAll,
    findById,
    saveBook,
    deleteBook,
    findImage,
    deleteImage,
    saveImage,
    findAllImage,
    update,
    findByCategoryId,
    findByAuthorId
}