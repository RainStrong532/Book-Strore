'use strict';

const Book = require('../../data/book');
const Image = require('../../data/image');
const Author = require('../../data/author');
const Category = require('../../data/category');
const config = require('../../../config');

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

    let sort = sortType.filter(item => item===sort_by);
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

        for (let i = 0; i < result.length; i++){
            const img = await Book.findOneImage(result[i].book_id);
            if(img[0]){
                img[0].url = img[0].url = config.url + "/public/images/" + img[0].name;
                result[i] = {...result[i], image: {...img[0]}};
            }else{
                result[i] = {...result[i], image: null};
            }
        }
        
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
        if(!result){
            return res.status(404).send({
                success: 0, message: "Không tồn tại"
            })
        }
        let images = await Book.findAllImages(result.book_id);

        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                let rs = await Image.findById(images[i].image_id);
                rs[0].url = rs[0].url = config.url + "/public/images/" + rs[0].name;
                images[i] = { ...images[i], ...rs[0] };
            }
        }

        let authors = await Author.findByBookId(id);
        let categories = await Category.findByBookId(id);
        result = { ...result, images, authors, categories };
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
        const book = await Book.saveBook(data);

        if (!book.book_id) {
            return res.status(400).send({ success: 0, message: "Tạo thất bại" })
        }
        return res.status(200).send({ success: 1, data: book });
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
    let { images } = req.body;
    try {
        let imagesExist = await Book.findAllImages(book_id);
        for (let i = 0; i < imagesExist.length; i++) {
            let isDelete = images.find((image) => {
                return image.image_id === imagesExist[i].image_id;
            })
            if (!isDelete) {
                await Book.deleteImage({ book_id, image_id: imagesExist[i].image_id });
            }
        }
        for (let i = 0; i < images.length; i++) {
            let isAdd = imagesExist.find((image) => {
                return image.image_id === images[i].image_id;
            })
            if (!isAdd) {
                await Book.saveImage({ book_id, image_id: images[i].image_id });
            }
        }

        res.status(200).send({
            success: 1
        })
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

    let col = columns.filter(item => item===order_by);
    if (col.length === 0)
        return res.status(400).send({ success: 0, message: "order_by không hợp lệ" });

    let sort = sortType.filter(item => item===sort_by);
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

    let col = columns.filter(item => item===order_by);
    if (col.length === 0)
        return res.status(400).send({ success: 0, message: "order_by không hợp lệ" });

    let sort = sortType.filter(item => item===sort_by);
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

const saveAuthor = async (req, res, next) => {
    const { authors } = req.body;
    const { book_id } = req.params;

    try {
        let authorsExist = await Author.findByBookId(book_id);
        for (let i = 0; i < authorsExist.length; i++) {
            let isDelete = authors.find((author) => {
                return author.author_id === authorsExist[i].author_id;
            })
            if (!isDelete) {
                await Book.deleteAuthor({ book_id, author_id: authorsExist[i].author_id });
            }
        }
        for (let i = 0; i < authors.length; i++) {
            let isAdd = authorsExist.find((author) => {
                return author.author_id === authors[i].author_id;
            })
            if (!isAdd) {
                await Book.saveAuthor({ book_id, author_id: authors[i].author_id });
            }
        }

        res.status(200).send({
            success: 1
        })
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const saveCategory = async (req, res, next) => {
    const { categories } = req.body;
    const { book_id } = req.params;

    try {
        let categoriesExist = await Category.findByBookId(book_id);
        for (let i = 0; i < categoriesExist.length; i++) {
            let isDelete = categories.find((category) => {
                return category.category_id === categoriesExist[i].category_id;
            })
            if (!isDelete) {
                await Book.deleteCategory({ book_id, category_id: categoriesExist[i].category_id });
            }
        }
        for (let i = 0; i < categories.length; i++) {
            let isAdd = categoriesExist.find((category) => {
                return category.category_id === categories[i].category_id;
            })
            if (!isAdd) {
                await Book.saveCategory({ book_id, category_id: categories[i].category_id });
            }
        }

        res.status(200).send({
            success: 1
        })
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}
const deleteAuthor = async (req, res, next) => {
    const { book_id, author_id } = req.params;

    try {
        await Book.deleteAuthor({ author_id, book_id })
        res.status(200).send({
            success: 1
        })
    } catch (err) {
        res.status(400).send({
            success: 0, message: err.message
        })
    }
}
const deleteCategory = async (req, res, next) => {
    const { book_id, category_id } = req.params;

    try {
        await Book.deleteCategory({ category_id, book_id })
        res.status(200).send({
            success: 1
        })
    } catch (err) {
        res.status(400).send({
            success: 0, message: err.message
        })
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
    findByAuthorId,
    saveAuthor,
    deleteAuthor,
    saveCategory,
    deleteCategory
}