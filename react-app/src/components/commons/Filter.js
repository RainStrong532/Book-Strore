import React, { useEffect, useRef, useState } from 'react';

function Filter({
    options,
    id,
    getData,
    placeholder,
    text_search,
    setCurrent,
    limit,
    orderBy,
    sortBy,
    className,
    onChange,
    lastOption,
    onLastOption,
    ready,
    filter,
    setFilter
}) {

    const [selected, setSelected] = useState(-1);
    const selectedRef = useRef();

    useEffect(() => {
        if (getData && selected >= -1 && ready) {
            setCurrent(1);
            getData({
                text_search: text_search,
                page_number: 0,
                page_size: limit,
                order_by: orderBy,
                sort_by: sortBy ? 'ASC' : 'DESC'
            });
        }

        if (selected===-2) {
            if (onLastOption) {
                onLastOption();
            }
        }
    }, [selected]);

    useEffect(() => {
        if (filter && filter.name !== id) {
            setSelected(-1);
            selectedRef.current.value = -1;
        }
        if(filter && filter.name === id) {
            setSelected(filter.id);
            selectedRef.current.value = filter.id;
        }
    }, [filter])

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

    if (lastOption) {
        listOption.push(
            <option
                style={{ fontSize: "1.3rem", fontWeight: "500" }}
                className="py-2"
                onClick={(e) => {
                    setSelected(e.target.value);
                }}
                key={listOption.length} value={-2}>{lastOption}</option>
        )
    }
    return (
        <div className={`w-100 ${className || ""}`}>
            <select
                className="form-select w-100"
                aria-label="filter"
                style={{ border: "1px solid #999", borderRadius: "5px", height: "38px", background: "#fafafa" }}
                ref={selectedRef}
                onChange={() => {
                    setSelected(selectedRef.current.value);
                    setFilter({ ...filter, name: id, id: selectedRef.current.value });
                    if (onChange) {
                        onChange(selectedRef.current.value);
                    }
                }}
            >
                <option value="-1">{placeholder}</option>
                {listOption}
            </select>
        </div>
    )
}

export default Filter;