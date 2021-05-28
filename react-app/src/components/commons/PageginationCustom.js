import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationCustom() {
    return (
        <div className="w-100 d-flex justify-content-end">
            <select className="form-select form-select-sm mr-3" aria-label=".form-select-sm example" style={{ border: "1px solid #999", borderRadius: "5px", height: "40px" }}>
                <option defaultValue>Perpage</option>
                <option value="1">100</option>
                <option value="2">80</option>
                <option value="3">50</option>
            </select>


            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    )
}

export default PaginationCustom;