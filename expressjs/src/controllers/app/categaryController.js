'use strict';

const Category = require('../../data/category');

const columns = ['category_id', 'category_name', 'description'];
const sortType = ['ASC', 'DESC'];

const findAll = async (req, res, next) => {
    let page_number = parseInt(req.query.page_number) || 0;
    let page_size = parseInt(req.query.page_size) || 20;
    let text_search = req.query.text_search || '';
    let sort_by = req.query.sort_by || "ASC";
    let order_by = req.query.order_by || columns[0];

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
        let result = await Category.findAll(pattern, order_by, sort_by);
        let total = Math.ceil(result.length / page_size);
        result = result.splice(page_number * page_size, page_size);
        let url = new URL(`${process.env.HOST_URL}/api/app/categories`);
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
        let result = await Category.findById(id);
        res.status(200).send({
            success: 1,
            data: result,
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const findByParent = async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        let result = await Category.findByParentId(id);
        res.status(200).send({
            success: 1,
            data: result,
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const deleteCategory = async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        await Category.deleteCategory(id);
        res.status(200).send({
            success: 1
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const update = async (req, res, next) => {
    let data = req.body;
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        const rs = await Category.findById(id);
        if(rs.category_id){
            let d = {...rs, ...data};
        await Category.update(d, id);
        res.status(200).send({
            success: 1
        })
    }else{
        return res.status(404).send({
            success: 0, message: "Không tìm thấy thể loại"
        })
    }

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateParent = async (req, res, next) => {
    let parent_id = req.body;
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        await Category.updateParentId(id, parent_id);
        res.status(200).send({
            success: 1
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const deleteParent = async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).send({
            success: 0, message: "id is not an integer"
        })
    }

    try {
        await Category.updateParentId(id, null);
        res.status(200).send({
            success: 1
        })

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const save = async (req, res, next) => {
    const data = req.body;

    try {
        const category = await Category.save(data);

        if (!category.category_id) {
            return res.status(400).send({ success: 0, message: "Tạo thất bại" })
        }
        return res.status(200).send({ success: 1, data: { category_id: category.category_id } });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}


module.exports = {
    findAll,
    findById,
    findByParent,
    deleteCategory,
    update,
    updateParent,
    deleteParent,
    save
}