'use strict';

const config = require('../../../config');
const Author = require('../../data/author');
const Image = require('../../data/image');

const columns = ['author_id', 'author_name', 'description'];
const sortType = ['ASC', 'DESC'];

const findAll = async (req, res, next) => {
    let page_number = parseInt(req.query.page_number) || 0;
    let page_size = parseInt(req.query.page_size) || 20;
    let text_search = req.query.text_search || '';
    let sort_by = req.query.sort_by || "ASC";
    let order_by = req.query.order_by || "author_id";

    let col = columns.filter(item => item == order_by);
    if (col.length === 0)
        return res.status(400).send({ success: 0, message: "order_by không hợp lệ" });

    let sort = sortType.filter(item => item == sort_by);
    if (sort.length === 0) return res.status(400).send({ success: 0, message: "sort_by không hợp lệ" });

    let pattern = '%' + text_search + '%';

    if (!Number.isInteger(page_number) || !Number.isInteger(page_size)) {
        return res.status(400).send({
            success: 0,
            message: 'pag_size or page_number không hợp lệ'
        })
    }

    try {
        let result = await Author.findAll(pattern, order_by, sort_by);
        let total = Math.ceil(result.length / page_size);
        result = result.splice(page_number * page_size, page_size);
        let url = new URL(`${process.env.HOST_URL}/api/app/authors`);
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
        let result = await Author.findById(id);
        let images = await Author.findAllImages(result.author_id);
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

const deleteAuthor = async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        await Author.deleteAuthor(id);
        res.status(200).send({
            success: 1
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const save = async (req, res, next) => {
    const data = req.body;
    if(!data.author_name || data.author_name.length === 0){
        return res.status(400).send({
            success: 0,
            message: "Yêu cầu tên tác giả"
        })
    }
    try {
        const author = await Author.save(data);

        if (!author.author_id) {
            return res.status(400).send({ success: 0, message: "Tạo thất bại" })
        }

        if (data.images) {
            data.images.forEach(
                async (image) => {
                    await Author.saveImage({ author_id: author.author_id, image_id: image.image_id });
                }
            )
        }
        return res.status(200).send({ success: 1, data: { author_id: author.author_id } });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const findImage = async (req, res) => {
    let { author_id, image_id } = req.params;
    try {
        let result = await Author.findImage({ author_id, image_id });
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
    let { author_id, image_id } = req.params;
    try {
        await Author.deleteImage({ author_id, image_id });
        res.status(200).send({
            success: 1
        })
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const saveImage = async (req, res) => {
    let { author_id } = req.params;
    let { image_id } = req.body;
    try {
        const rs = await Author.existedImage({ author_id, image_id });
        const { isExisted } = rs[0];
        if (isExisted == '0') {
            await Author.saveImage({ author_id, image_id });
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
    const { author_id } = req.params;
    try {
        const result = await Author.findAllImages(author_id);
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
    const { author_id } = req.params;
    try {
        const rs = await Author.findById(author_id);
        if (rs.author_id) {
            let d = { ...rs, ...data };
            await Author.update(d, author_id);
            return res.status(200).send({ success: 1 });
        } else {
            res.status(404).send({ success: 0, message: "Không tìm thấy sách" });
        }
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}
module.exports = {
    findAll,
    findById,
    save,
    deleteImage,
    findImage,
    saveImage,
    findAllImage,
    deleteAuthor,
    update
}