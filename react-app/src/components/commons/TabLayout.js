import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Filter from './Filter';
import SearchBox from './SearchBox';
import TableCustom from './TableCustom';

function TabLayout({ data, fields }) {
    return (
        <div className="d-flex flex-column d-flex justify-content-between h-100 flex-grow-1">
            <div className="flex-grow-1">
                <Row className="my-3">
                    <Col lg={4}>
                        <SearchBox />
                    </Col>

                    <Col lg={2}>
                        <Filter />
                    </Col>
                </Row>
                <TableCustom data={data} fields={fields}/>
            </div>
        </div>
    )
}

export default TabLayout;