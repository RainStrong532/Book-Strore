import React from 'react';
import { Button, Table } from 'react-bootstrap';
import sortIcon from '../../assets/images/sort.svg';

function TableCustom({ fields,
    data,
    setOrderBy,
    setSortBy,
    sortBy,
    handleDetails,
    handleUpdate,
    handleDelete
}) {

    const gotoDetail = (item) => {
        let id = null;
        for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
                if (key.endsWith('id') && key !== 'parent_id') {
                    id = item[key];
                }
            }
        }
        if (handleDetails) {
            handleDetails(id);
        }
    }

    const gotoUpdate = (item) => {
        let id = null;
        for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
                if (key.endsWith('id') && key !== 'parent_id') {
                    id = item[key];
                }
            }
        }
        if (handleUpdate) {
            handleUpdate(id);
        }
    }

    const headerTable = () => {
        let listHeader = [];
        if (fields) {
            listHeader = fields.map((item, index) => {
                return (
                    <th key={index} className="pt-3" style={{ whiteSpace: 'nowrap' }}>
                        {item.name}
                        {
                            item.sortable
                                ?
                                <img
                                    style={{ cursor: "pointer" }}
                                    className="ml-3"
                                    src={sortIcon}
                                    alt="icon"
                                    width={12}
                                    onClick={() => {
                                        setOrderBy(item.key);
                                        setSortBy(!sortBy)
                                    }}
                                />
                                :
                                <></>
                        }
                    </th>
                )
            })
            listHeader.push(<th key="action"></th>);
        }
        return listHeader;
    }

    const contentTable = () => {
        let listContent = [];
        if (data) {
            listContent = data.map((item, index) => {
                const tifOptions = fields.map((field, i) => {
                    return (
                        field.key === 'id'
                            ?
                            <td key={`${index}${i}`}>{index + 1}</td>
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
                        <td key={index + 'action'} style={{ border: "none", height: "100%" }}>
                            <div className="d-flex">
                                <Button variant="primary" className="mx-2" title="Chi tiết"
                                    onClick={() => gotoDetail(item)}
                                >
                                    <i className="fas fa-eye"></i>
                                </Button>
                                <Button variant="warning" className="mx-2" title="Chỉnh sửa"
                                    onClick={() => gotoUpdate(item)}
                                >
                                    <i className="fas fa-edit" style={{ color: "#FFF" }}></i>
                                </Button>
                                <Button variant="danger" className="mx-2" title="Xóa"
                                    onClick={()=>{ 
                                        if(handleDelete){
                                            handleDelete(item)
                                        }
                                    }}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </Button>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
        return listContent;
    }
    return (
        <div style={{ minHeight: "100vh" }}>
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
        </div>
    )
}

export default TableCustom;