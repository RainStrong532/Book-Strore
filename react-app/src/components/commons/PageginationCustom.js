import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationCustom({ current, total, limit, setLimit, setCurrent }) {

    const handleSelected = (e) => {
        if (setLimit) {
            setLimit(e.target.value);
        }
    }

    const handleFirst = () => {
        if (setCurrent) {
            setCurrent(1);
        }
    }

    const handleLast = () => {
        if (setCurrent) {
            setCurrent(total);
        }
    }

    const handleNext = () => {
        if (setCurrent) {
            setCurrent(current + 1);
        }
    }

    const handlePrev = () => {
        if (setCurrent) {
            setCurrent(current - 1);
        }
    }

    return (
        <div className="w-100 d-flex justify-content-end">

            <select className="form-select form-select-sm mr-3 px-3 col-1" aria-label=".form-select-sm example" style={{ border: "1px solid #999", borderRadius: "5px", height: "40px" }}
                value={limit || 20}
                onChange={handleSelected}
            >
                <option value="50">50</option>
                <option value="30">30</option>
                <option value="20" defaultValue>20</option>
                <option value="10">10</option>
                <option value="5">5</option>
            </select>


            <Pagination>
                <Pagination.Prev disabled={current <= 1}
                    onClick={handlePrev}
                />
                {
                    current > 1
                        ?
                        <>
                            <Pagination.Item
                                onClick={handleFirst}
                            >{1}</Pagination.Item>
                        </>
                        :
                        <></>
                }

                {
                    (current > 2)
                        ?
                        <>
                            {(current > 3) && <Pagination.Ellipsis disabled />}
                            <Pagination.Item
                                onClick={handlePrev}
                            >{current - 1}</Pagination.Item>
                        </>
                        :
                        <></>
                }

                <Pagination.Item active>{current || 1}</Pagination.Item>

                {
                    (total - current > 1)
                        ?
                        <>
                            <Pagination.Item disabled={current === total - 1}
                                onClick={handleNext}
                            >{current + 1}</Pagination.Item>
                            {(total-current > 2) && <Pagination.Ellipsis disabled />}
                        </>
                        :
                        <></>
                }

                {
                    current < total
                        ?
                        <>
                            <Pagination.Item
                                onClick={handleLast}
                            >{total}</Pagination.Item>
                        </>
                        :
                        <></>
                }
                <Pagination.Next disabled={current >= total}
                    onClick={handleNext}
                />
            </Pagination>
        </div>
    )
}

export default PaginationCustom;