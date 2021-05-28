import React from 'react';

function Filter() {
    return (
        <div className="w-100">
            <select className="form-select w-100" aria-label="filter" style={{ border: "1px solid #999", borderRadius: "5px", height: "38px", background: "#fafafa" }}>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    )
}

export default Filter;