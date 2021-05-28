import React from 'react';
import { Button, Table } from 'react-bootstrap';
import sortIcon from '../../assets/images/sort.svg';

function TableCustom({ fields, data }) {

    const headerTable = () => {
        let listHeader = [];
        if (fields) {
            listHeader = fields.map((item, index) => {
                return (
                    <th key={index} className="pt-2">
                        {item.name}
                        {
                            item.sortable
                                ?
                                <img style={{ cursor: "pointer" }} className="ml-3" src={sortIcon} alt="icon" width={12} />
                                :
                                <></>
                        }
                    </th>
                )
            })
            listHeader.push(<th key="action"></th>);
            console.log("field header: ", listHeader);
        }
        return listHeader;
    }

    const contentTable = () => {
        let listContent = [];
        if (data) {
            listContent = data.map((item, index) => {
                const tifOptions = fields.map((field, i) => {
                    console.log('=================Key===================');
                    console.log(field.key);
                    console.log('====================================');
                    return (
                        field.key === 'id'
                        ?
                        <td key={`${index}${i}`}>{index+1}</td>
                        :
                        <td style={{ whiteSpace: i === 1 ? 'nowrap' : 'normal' }} key={`${index}${i}`}>{item[field.key] !== null ? item[field.key] : "null"}</td>
                    )
                }
                )
                return (
                    <tr key={index}>
                        {
                            tifOptions
                        }
                        <td key={index + 'action'} className="d-flex" style={{ border: "none"}}>
                            <Button variant="primary" className="mx-2">
                                Chi tiết
                            </Button>
                            <Button variant="warning" className="mx-2">
                                Chỉnh sửa
                            </Button>
                            <Button variant="danger" className="mx-2">
                                Xóa
                            </Button>
                        </td>
                    </tr>
                )
            })
        }
        return listContent;
    }
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    {
                        headerTable()
                    }
                </tr>
            </thead>
            <tbody>
                {
                    contentTable()
                }
            </tbody>
        </Table>
    )
}

export default TableCustom;