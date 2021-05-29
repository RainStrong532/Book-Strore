import React, { useEffect, useRef, useState } from 'react';

function Filter({ options, id, getData, placeholder, text_search, setCurrent, current, limit, orderBy, sortBy, filterActive, setFilterActive }) {

    const [selected, setSelected] = useState(-1);
    const selectedRef = useRef();

    useEffect(() => {
        if (getData && setSelected != -1) {
            setCurrent(1);
            getData({
                text_search: text_search,
                page_number: current - 1,
                page_size: limit,
                order_by: orderBy,
                sort_by: sortBy ? 'ASC' : 'DESC'
            }, 0, {name: id, id: selected});
        }
    }, [selected]);

    useEffect(() => {
        if(filterActive != id){
            setSelected(-1);
            selectedRef.current.value = -1;
        }
    }, [filterActive])

    let listOption = [];
    listOption = options.map((option, index) => {
        return (
            <option
            onClick={(e) => {
                setSelected(e.target.value);
            }}
            key={index} value={option.id}>{option.name}</option>
        )
    })
    return (
        <div className="w-100">
            <select
                className="form-select w-100"
                aria-label="filter"
                style={{ border: "1px solid #999", borderRadius: "5px", height: "38px", background: "#fafafa" }}
                ref={selectedRef}
                onChange={() => {
                    setSelected(selectedRef.current.value);
                    setFilterActive(id);
                }}
            >
                <option value="-1">{placeholder}</option>
                {listOption}
            </select>
        </div>
    )
}

export default Filter;