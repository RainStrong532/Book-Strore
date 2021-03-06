import React from 'react';
import { Button } from 'react-bootstrap';

function SearchBox({value, onChange}) {
    return (
        <div className="d-flex">
            <input type="text" className="form-control" style={{borderStartEndRadius: "0", borderEndEndRadius: "0", background: "#fafafa"}}
                value={value}
                onChange={(e) => { 
                    if(onChange){
                        onChange(e.target.value);
                    }
                }}
            />
            <Button variant="primary" style={{borderStartStartRadius: "0", borderEndStartRadius: "0"}}>
                <i className="fas fa-search"></i>
            </Button>

        </div>
    )
}

export default SearchBox;