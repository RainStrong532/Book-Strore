import React, { useEffect, useRef, useState } from 'react';

function Filter({
    options,
    id,
    getData,
    placeholder,
    text_search,
    setCurrent,
    current,
    limit,
    orderBy,
    sortBy,
    filterActive,
    setFilterActive,
    className,
    onChange,
    lastOption,
    onLastOption
}) {

    const [selected, setSelected] = useState(-1);
    const selectedRef = useRef();

    useEffect(() => {
        if (getData && selected >= -1) {
            setCurrent(1);
            getData({
                text_search: text_search,
                page_number: current - 1,
                page_size: limit,
                order_by: orderBy,
                sort_by: sortBy ? 'ASC' : 'DESC'
            }, 0, { name: id, id: selected });
        }

        if (selected == -2) {
            if (onLastOption) {
                onLastOption();
            }
        }
    }, [selected]);

    useEffect(() => {
        if (filterActive)
            if (filterActive != id) {
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
                    console.log("options: ", options);
                    setSelected(selectedRef.current.value);
                    if (setFilterActive)
                        setFilterActive(id);
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