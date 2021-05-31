import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import PaginationCustom from './PageginationCustom';
import SearchBox from './SearchBox';
import TableCustom from './TableCustom';
import Filter from './Filter';

function TabLayout({ data,
    fields,
    getData,
    listFilters,
    ids,
    placeholders,
    handleUpdate,
    handleDetails,
    onAddButton,
    onDelete
}) {

    const [limit, setLimit] = useState(20);
    const [current, setCurrent] = useState(1);
    const [text_search, setTextSearch] = useState("");
    const [sortBy, setSortBy] = useState(false);
    const [orderBy, setOrderBy] = useState();
    const [filterActive, setFilterActive] = useState(null);


    let list = [];

    if(listFilters){
        list = listFilters.map((item, index) => {
            let options = [];
            options = item.map(i => {
                let obj = {};
                for (const k in i) {
                    if (Object.hasOwnProperty.call(i, k)) {
                        if(k.endsWith('id') && k !== 'parent_id'){
                            obj.id = i[k];
                        }else if(k.endsWith('name')){
                            obj.name = i[k];
                        }
                    }
                }
                return obj;
            })
            return(
                <Col lg={3} key={index}>
                    <Filter
                        options={options}
                        getData={getData}
                        id={ids[index]}
                        placeholder={placeholders[index]}
                        setCurrent={setCurrent}
                        current={current}
                        text_search={text_search}
                        orderBy={orderBy}
                        sortBy={sortBy}
                        limit={limit}
                        setFilterActive={setFilterActive}
                        filterActive={filterActive}
                    />
                </Col>
            )
        })
    }

    useEffect(() => {
        if (getData) {
            setCurrent(1);
            getData({
                text_search: text_search,
                page_number: 0,
                page_size: limit,
                order_by: orderBy,
                sort_by: sortBy ? 'ASC' : 'DESC'
            }, 1)
        }
    }, [text_search]);

    useEffect(() => {
        if (getData) {
            getData({
                text_search: text_search,
                page_number: current - 1,
                page_size: limit,
                order_by: orderBy,
                sort_by: sortBy ? 'ASC' : 'DESC'
            })
        }
    }, [current, limit, orderBy, sortBy])

    return (
        <div className="d-flex flex-column d-flex justify-content-between h-100 flex-grow-1">
            <div className="flex-grow-1">
                <Row className="my-4">
                    <Col lg={4}>
                        <SearchBox
                            value={text_search}
                            onChange={setTextSearch}
                        />
                    </Col>

                   {
                       list
                   }

                    <Col lg={2}>
                        <Button variant="success" title="Thêm mới"
                            onClick={() => {
                                if(onAddButton){
                                    onAddButton();
                                }
                            }}
                        >
                            <i className="fas fa-plus"></i>
                        </Button>
                    </Col>
                </Row>

                <TableCustom data={data.data} fields={fields}
                    setOrderBy={setOrderBy}
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                    handleDetails={handleDetails}
                    handleUpdate={handleUpdate}
                    handleDelete={onDelete}
                />
            </div>
            <PaginationCustom total={data.total} current={current} limit={limit} setLimit={setLimit} setCurrent={setCurrent} />
        </div>
    )
}

export default TabLayout;